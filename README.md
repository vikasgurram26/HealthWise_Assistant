# HealthWise_Assistant

This is an AI-powered health assistant application built with Next.js, Firebase, and Google's Generative AI.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd HealthWise_Assistant
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

This project requires several API keys and configuration values to run.

1.  **Create a `.env` file** in the root of your project.
2.  **Copy the contents** of `.env.example` into your new `.env` file.
3.  **Fill in the values**:
    *   `GEMINI_API_KEY`: Get this from [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`: Get these from your [Twilio Console](https://www.twilio.com/console).

## Troubleshooting Authentication

### Error: auth/unauthorized-domain
If you see this error when signing in with Google, you need to whitelist your current domain:
1.  Go to the **[Firebase Authentication Settings](https://console.firebase.google.com/project/studio-7604290226-11533/authentication/settings)**.
2.  Click on **Authorized domains**.
3.  Click **Add domain**.
4.  Enter the domain of your current running app (e.g., the URL in your browser without `https://` and path) and click **Add**.

## Deployment to Firebase App Hosting

### 1. Upgrade Your Firebase Project to the Blaze Plan (MANDATORY)

Firebase App Hosting requires your project to be on the **"Blaze" (pay-as-you-go)** plan. Even though there is a generous free tier, this plan is required to enable the necessary cloud resources.

1.  Go to the **[Firebase Console](https://console.firebase.google.com/project/studio-7604290226-11533/overview)**.
2.  Click the **"Upgrade"** button at the bottom left of the sidebar.
3.  Follow the steps to associate a billing account.

#### Troubleshooting Billing Error [OR_BACR2_44]
If you see this error during the upgrade:
*   **Try a different card:** Credit cards (Visa/Mastercard) are more reliable than Debit or UPI.
*   **Enable International Usage:** Ensure your bank allows international online transactions.
*   **Contact Support:** Contact [Google Cloud Billing Support](https://support.google.com/cloud/contact/cloud_billing_support) directly to clear the block on your account.

### 2. Set Your Secrets in Firebase App Hosting

After upgrading, you must set your API keys as secrets so the live app can use them.

1.  Go to the **[App Hosting page](https://console.firebase.google.com/project/studio-7604290226-11533/hosting)**.
2.  Find your backend (e.g., `nextn`), click the **three-dot menu (⋮)**, and select **Edit backend**.
3.  In the **Environment variables** section, click **Add variable** and add these four:
    *   `GEMINI_API_KEY`
    *   `TWILIO_ACCOUNT_SID`
    *   `TWILIO_AUTH_TOKEN`
    *   `TWILIO_PHONE_NUMBER`
4.  Click **Save**.

### 3. Deploy Using the Firebase CLI

1.  **Install Firebase Tools** globally:
    ```bash
    npm install -g firebase-tools
    ```
2.  **Log in to Firebase**:
    ```bash
    firebase login
    ```
3.  **Deploy**:
    ```bash
    firebase deploy
    ```

Your live URL will be provided in the terminal output once the process completes.
