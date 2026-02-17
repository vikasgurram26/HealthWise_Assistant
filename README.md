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

Your `.env` file should look like this:

```
GEMINI_API_KEY=AIzaSy...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
```

### Running the Development Server

To run the app locally, use the following command:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deployment to Firebase App Hosting

### 1. Set Your Secrets in Firebase App Hosting

**This is a critical step.** Your live application needs these secrets to run. You must set them before your first deployment.

1.  **Go to Firebase App Hosting**: Use this direct link to your project's App Hosting page:
    [https://console.firebase.google.com/project/studio-7604290226-11533/app-hosting](https://console.firebase.google.com/project/studio-7604290226-11533/app-hosting)

2.  **Find Your Backend**: On that page, you should see your backend listed (the name is `nextn`). Click the **three-dot menu (⋮)** next to it and select **Edit backend**.

3.  **Add Secrets**:
    *   In the "Edit backend" panel that opens, find the **Environment variables** section.
    *   Click **Add variable**.
    *   Add the following four variables, one by one. You'll get these values from your `.env` file and your Twilio account.
        *   `GEMINI_API_KEY`
        *   `TWILIO_ACCOUNT_SID`
        *   `TWILIO_AUTH_TOKEN`
        *   `TWILIO_PHONE_NUMBER`

4.  **Save Changes**: After adding all four variables, click **Save**.

### 2. Deploy Using the Firebase CLI

You will need the Firebase Command Line Interface (CLI) to deploy your website.

1.  **Install the Firebase CLI** globally on your machine if you haven't already:
    ```bash
    npm install -g firebase-tools
    ```

2.  **Log in to Firebase** with your Google account:
    ```bash
    firebase login
    ```

3.  **Deploy your website**: From your project's root directory, run the deploy command. This will build your Next.js application and deploy it.
    ```bash
    firebase deploy
    ```

After the command finishes, the CLI will give you the **live URL** for your website. Congratulations, you're live!
