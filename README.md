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

### 2. Set Your Secrets (Crucial for AI to work)
Before your first deployment, you must add your API keys to the App Hosting dashboard. **Do NOT put these keys in your code.**
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

---

## 🐙 Manual GitHub Synchronization

You have successfully generated your Personal Access Token (PAT). Run these commands in your terminal to push your code:

### Commands to Push:
Run these in your terminal:

```bash
# 1. Update the remote URL with your token (REPLACE <YOUR_TOKEN> with your actual token)
git remote set-url origin https://<YOUR_TOKEN>@github.com/vikasgurram26/HealthWise_Assistant.git

# 2. Upload your changes
git add .
git commit -m "Update codebase with latest features"
git push -u origin main
```

---

## 🟢 WhatsApp Integration Setup (Twilio Sandbox)

To connect your AI to WhatsApp:

1.  **Configure the Webhook**:
    *   In the Twilio Console, go to **Messaging > Settings > WhatsApp Sandbox Settings**.
    *   **URL**: `https://studio--studio-7604290226-11533.us-central1.hosted.app/api/whatsapp`
    *   **Method**: `POST`
    *   Click **Save**.

2.  **Testing (IMPORTANT)**:
    *   **EVERY NEW USER** must first join your sandbox.
    *   The user must send the bold "join" code (e.g., **join apple-sauce**) to your Twilio number.
    *   Once they receive a confirmation message, they can chat with your AI via WhatsApp!

---

## ✅ Final Launch Checklist

Before you test, make sure:
1. [ ] You clicked **Save** on the Twilio Sandbox settings page.
2. [ ] You sent the "join" message from your WhatsApp to the Twilio number.
3. [ ] You added all 4 **Secrets** in the Firebase App Hosting console.
4. [ ] You clicked **Publish** in Firebase Studio and the deployment finished.
