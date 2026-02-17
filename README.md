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

This application is configured for easy deployment to Firebase App Hosting.

### 1. Set Your Secrets in Firebase

**This is a critical step.** Your live application does not use the `.env` file. You must set your API keys securely in the Firebase console.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project: **studio-7604290226-11533**
3.  Navigate to the **App Hosting** section.
4.  Find your backend and go to its settings.
5.  In the **Environment variables** section, add each key from your `.env` file (e.g., `GEMINI_API_KEY`) as a new secret.

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
