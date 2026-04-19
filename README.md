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

---

## 🐙 Manual GitHub Synchronization

### Push Commands
If you are working locally and want to push your code to GitHub, follow these commands:

1. **Connect to your repo** (only needs to be done once):
   ```bash
   git remote add origin <YOUR_GITHUB_REPO_URL>
   ```

2. **Upload your changes**:
   ```bash
   git add .
   git commit -m "Update health assistant features"
   git push -u origin main
   ```

### 🔐 Authentication Error Fix (Invalid username or token)
GitHub does not accept passwords for Git commands. You must use a **Personal Access Token (PAT)**.

1. **Generate Token**: Go to GitHub **Settings > Developer settings > Personal access tokens > Tokens (classic)**.
2. **Permissions**: Generate a new token with the `repo` scope selected.
3. **Usage**: When the terminal asks for your password, **paste the token** instead.
4. **Shortcut**: To save the token and stop being asked, use:
   `git remote set-url origin https://<YOUR_TOKEN>@github.com/vikasgurram26/HealthWise_Assistant.git`

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
    *   Go to **Messaging > Try it out > Send a WhatsApp message**.
    *   Look for the bold code (e.g., **join apple-sauce**).
    *   The user must send that exact code to the Twilio number first.
    *   Once they receive a confirmation message, they can chat with your AI!

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
