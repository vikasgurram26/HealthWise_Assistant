# Project Report: HealthWise Assistant

This document provides a comprehensive overview of the HealthWise Assistant application, detailing its objectives, core features, technology stack, and design principles.

## 1. Project Objective

HealthWise Assistant is an AI-powered web application designed to be a user-friendly and reliable health information tool. Its primary goal is to empower users to make informed decisions about their health by providing accessible, evidence-based information on preventive care, symptoms, and general wellness. The application acts as an intelligent assistant, leveraging generative AI to deliver personalized and context-aware guidance.

---

## 2. Core Features Implemented

The application is built around several key features, all of which are fully functional:

*   **AI Chatbot**: A conversational interface where users can ask general health-related questions and receive informative, empathetic responses. The chatbot is programmed to always include a disclaimer to consult a healthcare professional.
*   **Symptom Guidance**: A tool that allows users to describe their symptoms and location to receive AI-powered guidance on possible conditions. This feature integrates with a live data source to consider local disease outbreak alerts.
*   **Preventive Healthcare Info**: An AI-driven feature that provides detailed information on preventive measures for various diseases, including guidance on how and when to apply them.
*   **Vaccination Schedules**: A utility that generates recommended vaccination schedules based on a user's age group, providing details on the purpose and timing of each vaccine.
*   **Outbreak Alerts**: A dedicated page that displays live disease outbreak news and alerts directly from the World Health Organization (WHO), keeping users informed about global health events.
*   **Health Dashboard**: A central hub that provides a snapshot of global health statistics (cases, deaths, recoveries), a feed of recent outbreak alerts, and quick access to the app's main tools.

---

## 3. Technology Stack

The project is built on a modern, robust, and scalable technology stack, chosen for its performance and developer experience.

*   **Framework**: **Next.js 15** (using the App Router) provides the foundation, enabling a hybrid of server-side rendering (SSR) for speed and client-side interactivity.
*   **Language**: **TypeScript** is used throughout the project for type safety, improved code quality, and better maintainability.
*   **UI Library**: **React** is used for building the interactive user interface.
*   **AI & NLP Framework**:
    *   **Genkit**: This is the core AI orchestration framework used to define, manage, and execute all generative AI tasks.
    *   **Google Gemini**: The powerful Large Language Model (LLM) that performs the Natural Language Processing (NLP), understanding user input and generating intelligent, context-aware responses for all AI features.
*   **Styling**:
    *   **Tailwind CSS**: A utility-first CSS framework used for all styling, enabling rapid and consistent design implementation.
    *   **ShadCN UI**: A collection of beautifully designed, accessible, and reusable UI components built on top of Tailwind CSS. This ensures a consistent and professional look and feel across the application.
*   **Icons**: **Lucide React** is used for its clear, modern, and lightweight icon set.

---

## 4. Styling and Design Philosophy

The visual design is intended to be clean, calming, and trustworthy, reflecting the application's healthcare focus.

*   **Color Palette**:
    *   **Primary**: Light blue (`#B2E2F2`) is used for primary buttons, links, and highlights to evoke a sense of trust and calmness.
    *   **Background**: A very light, clean blue (`#F2FAFC`) provides a fresh and unobtrusive backdrop.
    *   **Accent**: A soft green (`#B2F2D6`) is used for supplementary actions and highlights.
*   **Typography**: The **'PT Sans'** font is used for both headlines and body text. As a humanist sans-serif, it combines a modern, clean look with a touch of warmth and personality, enhancing readability.
*   **Layout**: The design is fully responsive, adapting cleanly to different screen sizes from mobile to desktop. The layout is organized using cards, clear hierarchies, and ample white space to ensure information is easy to digest.
*   **Component-Based Design**: By using ShadCN UI, the application maintains a consistent visual language with elements like rounded corners, subtle shadows, and professional-looking inputs and buttons.

---

## 5. Running the Project Locally

To run this project on your local machine, please follow these steps.

### Prerequisites

*   Node.js (v20 or later)
*   npm (or a compatible package manager)

### 1. Install Dependencies

First, install the necessary Node.js packages. Open a terminal in the project's root directory and run:

```bash
npm install
```

### 2. Set Up Environment Variables

The application uses Genkit with Google's Gemini model, which requires an API key.

1.  Create a new file named `.env` in the root of the project.
2.  Add your Gemini API key to the file:

    ```
    GEMINI_API_KEY=your_api_key_here
    ```

    You can obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Run the Development Servers

This project requires two separate development servers to be running simultaneously:

*   The **Next.js server** for the web application UI.
*   The **Genkit server** to handle the AI flows.

**Terminal 1: Start the Genkit Server**

In your first terminal, run the following command to start the Genkit development server:

```bash
npm run genkit:dev
```

This will start the AI backend service and make it available for the Next.js application to call.

**Terminal 2: Start the Next.js Server**

In a second terminal, run the following command to start the Next.js web application:

```bash
npm run dev
```

This will start the front-end application, which typically runs on `http://localhost:9002`. You can now open this URL in your web browser to use the HealthWise Assistant.