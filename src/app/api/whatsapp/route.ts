
import { NextRequest, NextResponse } from 'next/server';
import { chat } from '@/ai/flows/chat-flow';
import twilio from 'twilio';

// Initialize the Twilio client
// IMPORTANT: These values must be set in your environment variables.
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio WhatsApp number

// A simple in-memory store for chat histories.
// In a production app, you would use a database like Firestore.
const chatHistories: Record<string, any[]> = {};

export async function POST(req: NextRequest) {
  if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.error('Twilio credentials are not configured in environment variables.');
    return new NextResponse('Internal Server Error: Twilio not configured', { status: 500 });
  }

  const client = twilio(accountSid, authToken);
  const body = await req.formData();
  const incomingMsg = body.get('Body') as string;
  const from = body.get('From') as string; // This will be in 'whatsapp:+14155238886' format

  if (!incomingMsg || !from) {
    return new NextResponse('Bad Request: Missing Body or From field', { status: 400 });
  }

  // Retrieve or initialize chat history
  const userHistory = chatHistories[from] || [];

  try {
    // Call our existing chat flow
    const response = await chat({
      history: userHistory,
      prompt: incomingMsg,
    });

    const aiResponseText = response.text;

    // Add the user message and AI response to history
    userHistory.push({ role: 'user', content: [{ text: incomingMsg }] });
    userHistory.push({ role: 'model', content: [{ text: aiResponseText }] });
    chatHistories[from] = userHistory;

    // Send the reply back to the user via WhatsApp
    await client.messages.create({
      body: aiResponseText,
      from: `whatsapp:${twilioPhoneNumber}`,
      to: from,
    });

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error processing WhatsApp message:', error);
    // Attempt to send an error message back to the user
    try {
      await client.messages.create({
        body: 'Sorry, I encountered an error and could not process your request.',
        from: `whatsapp:${twilioPhoneNumber}`,
        to: from,
      });
    } catch (sendError) {
      console.error('Failed to send error message via WhatsApp:', sendError);
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
