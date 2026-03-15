# HealthWise Assistant

This is an AI-powered health assistant application built with Next.js, Firebase, and Google's Generative AI.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later)
*   npm

### Installation

1.  Clone the repository.
2.  Navigate to the project directory: `cd HealthWise_Assistant`
3.  Install dependencies: `npm install`

### Environment Variables

Create a `.env` file in the root and add:
*   `GEMINI_API_KEY`: From [Google AI Studio](https://aistudio.google.com/app/apikey).
*   `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`: From your [Twilio Console](https://www.twilio.com/console).

---

## 🟢 WhatsApp Integration Setup

To connect your AI to WhatsApp, follow these steps:

1.  **Get a Twilio WhatsApp Number**: In the Twilio Console, go to **Messaging > Try it Out > Send a WhatsApp message** to set up your Sandbox.
2.  **Set the Webhook**: 
    *   In Twilio, go to **Messaging > Settings > WhatsApp Sandbox Settings**.
    *   Find the field **"When a message comes in"**.
    *   Enter your live URL followed by the API path: `https://your-app-url.com/api/whatsapp`.
    *   Set the method to **POST**.
3.  **Add Secrets**: Ensure your `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER` are added to your Firebase App Hosting environment variables.

---

## Troubleshooting Authentication

### Error: auth/unauthorized-domain
If you see this error when signing in with Google:
1.  Go to the **[Firebase Authentication Settings](https://console.firebase.google.com/project/studio-7604290226-11533/authentication/settings)**.
2.  Click on **Authorized domains**.
3.  Click **Add domain**.
4.  Enter: `studio--studio-7604290226-11533.us-central1.hosted.app` and click **Add**.

## Deployment to Firebase App Hosting

### 1. Upgrade to Blaze Plan (MANDATORY)
Firebase App Hosting requires the **"Blaze" (pay-as-you-go)** plan. You still get a generous free tier.
*   Go to the **[Firebase Console](https://console.firebase.google.com/project/studio-7604290226-11533/overview)**.
*   Click the **"Upgrade"** button at the bottom left.

### 2. Set Your Secrets
*   Go to **[App Hosting](https://console.firebase.google.com/project/studio-7604290226-11533/hosting)**.
*   Find your backend, click **⋮ > Edit backend**.
*   Add: `GEMINI_API_KEY`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`.

### 3. Deploy CLI
1.  `npm install -g firebase-tools`
2.  `firebase login`
3.  `firebase deploy`
