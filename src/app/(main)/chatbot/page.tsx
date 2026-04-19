'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Stethoscope, User, Languages, Send } from 'lucide-react';
import { chat, ChatMessage } from '@/ai/flows/chat-flow';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/i18n/use-translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CHAT_LANGUAGES = [
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'हिन्दी (Hindi)' },
  { value: 'Telugu', label: 'తెలుగు (Telugu)' },
];

export default function ChatbotPage() {
  const t = useTranslations('ChatbotPage');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatLanguage, setChatLanguage] = useState('English');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: [{ text: input }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chat({
        history: messages,
        prompt: input,
        language: chatLanguage,
      });

      const modelMessage: ChatMessage = { role: 'model', content: [{ text: response.text }] };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error getting response from AI', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        content: [{ text: t('errorMessage') }],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[calc(100vh-10rem)] flex flex-col rounded-3xl overflow-hidden border-primary/10 shadow-2xl glass-card">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-background/50 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Stethoscope className="size-6" />
          </div>
          <div className="flex flex-col">
            <CardTitle className="text-xl font-bold">{t('title')}</CardTitle>
            <CardDescription className="text-xs">{t('description')}</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Languages className="size-4 text-muted-foreground" />
          <Select value={chatLanguage} onValueChange={setChatLanguage}>
            <SelectTrigger className="w-[120px] h-9 text-xs rounded-xl border-primary/20">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {CHAT_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="text-xs">
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden p-0 relative">
        <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground opacity-40">
                <MessageCircle className="size-20 mb-4" />
                <p className="text-lg">Start a conversation with HealthWise AI</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'model' && (
                  <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-sm">
                    <div className="flex size-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Stethoscope className="size-5" />
                    </div>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl p-4 text-sm md:text-base shadow-sm leading-relaxed',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-white border-2 border-primary/5 rounded-tl-none'
                  )}
                >
                  <p className="whitespace-pre-line">{message.content[0].text}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    {userAvatar ? (
                      <Image
                        src={userAvatar.imageUrl}
                        alt={userAvatar.description}
                        width={40}
                        height={40}
                        data-ai-hint={userAvatar.imageHint}
                        className="rounded-full"
                      />
                    ) : (
                      <AvatarFallback>
                        <User className="size-6" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-4 justify-start">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <div className="flex size-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Stethoscope className="size-5" />
                  </div>
                </Avatar>
                <div className="bg-white border-2 border-primary/5 rounded-2xl rounded-tl-none p-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-primary/40 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-6 bg-background/80 backdrop-blur-sm border-t">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              placeholder={t('placeholder')}
              disabled={isLoading}
              className="flex-grow h-14 rounded-2xl border-primary/10 bg-white/50 px-6 text-lg focus-visible:ring-primary shadow-inner"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()} 
              size="icon"
              className="size-14 rounded-2xl shadow-lg shadow-primary/20 active:scale-90 transition-transform"
            >
              <Send className="size-6" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { MessageCircle } from 'lucide-react';