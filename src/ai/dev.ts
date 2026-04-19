import { config } from 'dotenv';
config();

import '@/ai/flows/preventive-healthcare-info.ts';
import '@/ai/flows/symptom-guidance.ts';
import '@/ai/flows/chat-flow.ts';
import '@/ai/flows/vaccination-schedule-flow.ts';
import '@/ai/flows/welcome-video-flow.ts';
