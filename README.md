# HealthWise Assistant

This is an AI-powered health assistant application built with Next.js, Firebase, and Google's Generative AI.

## 🚀 Development vs. Production

It's important to understand the difference between where you write code and where users see it:

*   **Firebase Studio (Development):** This is your "workshop." Changes made here are saved to your source code but are **NOT** visible on your live website yet.
*   **Live Website (Production):** This is the version your users see. It only updates when you perform a **Deployment**.

---

## 🟢 Deployment to Firebase App Hosting

### 1. Upgrade to Blaze Plan (MANDATORY)
Firebase App Hosting requires the **"Blaze" (pay-as-you-go)** plan. You still get a generous free tier.
*   Go to the **[Firebase Console](https://console.firebase.google.com/project/studio-7604290226-11533/overview)**.
*   Click the **"Upgrade"** button at the bottom left.

### 2. Set Your Secrets
Before your first deployment, you must add your API keys to the App Hosting dashboard:
*   Go to **[App Hosting](https://console.firebase.google.com/project/studio-7604290226-11533/hosting)**.
*   Find your backend (e.g., `nextn`), click **⋮ > Edit backend**.
*   Add the following variables:
    *   `GEMINI_API_KEY`
    *   `TWILIO_ACCOUNT_SID`
    *   `TWILIO_AUTH_TOKEN`
    *   `TWILIO_PHONE_NUMBER`
*   Click **Save**.

### 3. Deploy Your Changes
**Option A: The Publish Button (Easiest)**
*   Simply click the **"Publish"** button in the top-right corner of this Firebase Studio interface. This will start an automatic build and deployment process.

**Option B: Using the Terminal**
1.  `npm install -g firebase-tools` (if not already installed)
2.  `firebase login`
3.  `firebase deploy`

---

## 🟢 WhatsApp Integration Setup

To connect your AI to WhatsApp using Twilio:

1.  **Join the Twilio Sandbox**:
    *   Log in to the **[Twilio Console](https://console.twilio.com/)**.
    *   Go to **Messaging > Try it out > Send a WhatsApp message**.
    *   Follow the instructions to send a WhatsApp message (usually "join <word>") to the Twilio number provided. This links your phone to the sandbox.

2.  **Configure the Webhook**:
    *   In the Twilio Console, go to **Messaging > Settings > WhatsApp Sandbox Settings**.
    *   Locate the field labeled **"When a message comes in"**.
    *   Enter your **LIVE URL**: `https://studio--studio-7604290226-11533.us-central1.hosted.app/api/whatsapp`
    *   Ensure the dropdown next to it is set to **POST**.
    *   Click **Save**.

3.  **Test It**:
    *   Send a message like "Hi, I have a fever" to the Twilio WhatsApp number.
    *   Your AI assistant will reply directly in WhatsApp!

---

## ✅ Final Launch Checklist

Before you test, make sure:
1. [ ] You clicked **Save** on the Twilio Sandbox settings page.
2. [ ] You sent the "join" message from your WhatsApp to the Twilio number.
3. [ ] You added all 4 **Secrets** in the Firebase App Hosting console.
4. [ ] You clicked **Publish** in Firebase Studio and the deployment finished.

---

## 🛠 Troubleshooting

### Error: auth/unauthorized-domain
If Google Sign-In fails:
1.  Go to **[Authentication > Settings > Authorized domains](https://console.firebase.google.com/project/studio-7604290226-11533/authentication/settings)**.
2.  Add: `studio--studio-7604290226-11533.us-central1.hosted.app`

### Billing Error [OR_BACR2_44]
If you cannot upgrade to the Blaze plan:
1.  Ensure your card has **International Transactions** enabled.
2.  Try a different Credit/Debit card (Visa/Mastercard preferred).
3.  Contact **[Google Billing Support](https://support.google.com/cloud/contact/cloud_billing_support)**.
