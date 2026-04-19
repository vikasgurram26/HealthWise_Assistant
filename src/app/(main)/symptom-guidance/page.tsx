'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { 
  HeartPulse, 
  Send, 
  Bot, 
  User, 
  AlertTriangle, 
  RefreshCcw,
  Stethoscope
} from 'lucide-react';
import {
  symptomGuidance,
  SymptomGuidanceOutput,
  TriageMessage
} from '@/ai/flows/symptom-guidance';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import useLocalStorage from '@/hooks/use-local-storage';
import { useTranslations } from '@/lib/i18n/use-translations';
import { cn } from '@/lib/utils';

export default function SymptomGuidancePage() {
  const t = useTranslations('SymptomGuidancePage');
  const [location, setLocation] = useLocalStorage('symptom-location', '');
  const [history, setHistory] = useState<TriageMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<SymptomGuidanceOutput | null>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || !location.trim()) {
      if (!location.trim()) {
        toast({
          variant: 'destructive',
          title: t('missingLocationTitle'),
          description: t('missingLocationDescription'),
        });
      }
      return;
    }

    const userMessage: TriageMessage = { role: 'user', text: input };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await symptomGuidance({ 
        history: newHistory, 
        location 
      });

      setHistory(prev => [...prev, { role: 'model', text: response.message }]);
      setLastResult(response);
    } catch (error) {
      console.error('Error getting symptom guidance:', error);
      toast({
        variant: 'destructive',
        title: t('errorTitle'),
        description: t('errorDescription'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetTriage = () => {
    setHistory([]);
    setLastResult(null);
    setInput('');
  };

  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      <Card className="border-primary/20 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="text-primary" />
              {t('title')}
            </CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={resetTriage} className="text-muted-foreground">
            <RefreshCcw className="mr-2 size-4" />
            {t('reset')}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 mb-4">
            <Label htmlFor="location">{t('locationLabel')}</Label>
            <Input
              id="location"
              placeholder={t('locationPlaceholder')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading || history.length > 0}
              className="max-w-xs"
            />
          </div>

          <ScrollArea className="h-[400px] rounded-md border p-4 bg-muted/30" ref={scrollAreaRef}>
            <div className="space-y-4">
              {history.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  <HeartPulse className="size-12 mx-auto mb-4 opacity-20" />
                  <p>{t('startInstruction')}</p>
                </div>
              )}
              {history.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex gap-3",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === 'model' && (
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Bot size={16} />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-3 text-sm shadow-sm",
                      msg.role === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border"
                    )}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="size-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground border">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Bot size={16} />
                  </div>
                  <div className="bg-background border rounded-2xl p-4 shadow-sm w-16">
                    <div className="flex gap-1">
                      <div className="size-1.5 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="size-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="size-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Input
            placeholder={t('chatPlaceholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading || lastResult?.status === 'analysis_complete'}
            className="flex-grow"
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim() || lastResult?.status === 'analysis_complete'}
          >
            <Send className="size-4" />
          </Button>
        </CardFooter>
      </Card>

      {lastResult?.status === 'analysis_complete' && lastResult.analysis && (
        <Card className="border-green-500/20 bg-green-50/10 dark:bg-green-900/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" />
              {t('analysisTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              {lastResult.analysis.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{item.condition}</span>
                    <span className="text-primary">{item.probability}%</span>
                  </div>
                  <Progress value={item.probability} className="h-2" />
                  <p className="text-xs text-muted-foreground">{item.reasoning}</p>
                </div>
              ))}
            </div>
            
            <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
              <AlertTitle>{t('disclaimerTitle')}</AlertTitle>
              <AlertDescription className="text-xs">
                {lastResult.disclaimer}
              </AlertDescription>
            </Alert>
            
            <Button onClick={resetTriage} variant="outline" className="w-full">
              {t('startOver')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
