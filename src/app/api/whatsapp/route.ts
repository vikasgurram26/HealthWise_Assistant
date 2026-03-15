
import { NextRequest, NextResponse } from 'next/server';
import { chat } from '@/ai/flows/chat-flow';
import twilio from 'twilio';

/**
 * @fileOverview WhatsApp Webhook Route
 * 
 * This route handles incoming messages from Twilio's WhatsApp API.
 * 1. Validates Twilio credentials.
 * 2. Processes the incoming message using our AI chat flow.
 * 3. Sends the AI's response back to the user via WhatsApp.
 */

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Simple in-memory session storage for the prototype. 
// For production, use a database like Firestore to persist history.
const sessions: Record<string, any[]> = {};

export async function POST(req: NextRequest) {
  if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.error('WhatsApp integration failed: Missing Twilio environment variables.');
    return new NextResponse('Configuration Error', { status: 500 });
  }

  try {
    const client = twilio(accountSid, authToken);
    const formData = await req.formData();
    const incomingMsg = formData.get('Body') as string;
    const from = formData.get('From') as string; // Format: 'whatsapp:+123456789'

    if (!incomingMsg || !from) {
      return new NextResponse('Invalid Request', { status: 400 });
    }

    // Initialize or retrieve chat history for this specific phone number
    if (!sessions[from]) {
      sessions[from] = [];
    }
    const history = sessions[from];

    // Get response from our AI Chat Flow
    const aiResponse = await chat({
      history: history,
      prompt: incomingMsg,
    });

    // Update session history
    history.push({ role: 'user', content: [{ text: incomingMsg }] });
    history.push({ role: 'model', content: [{ text: aiResponse.text }] });

    // Send the reply back via Twilio
    await client.messages.create({
      body: aiResponse.text,
      from: `whatsapp:${twilioPhoneNumber}`,
      to: from,
    });

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error in WhatsApp Webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
