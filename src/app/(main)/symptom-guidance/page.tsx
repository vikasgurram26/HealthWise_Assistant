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
  Stethoscope,
  MapPin
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
    <div className="grid gap-8 max-w-5xl mx-auto pb-10">
      <Card className="border-primary/10 shadow-2xl rounded-[2.5rem] overflow-hidden glass-card flex flex-col min-h-[600px]">
        <CardHeader className="flex flex-row items-center justify-between bg-primary/5 px-8 py-6 border-b">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
              <HeartPulse className="size-8" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                {t('title')}
              </CardTitle>
              <CardDescription className="text-base">{t('description')}</CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={resetTriage} className="rounded-xl border-primary/20 hover:bg-primary/10">
            <RefreshCcw className="mr-2 size-4" />
            {t('reset')}
          </Button>
        </CardHeader>
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="px-8 py-6 bg-white/50 border-b flex items-center gap-4">
            <Label htmlFor="location" className="flex items-center gap-2 font-bold text-muted-foreground">
              <MapPin className="size-4" />
              {t('locationLabel')}
            </Label>
            <Input
              id="location"
              placeholder={t('locationPlaceholder')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading || history.length > 0}
              className="max-w-xs rounded-xl border-primary/10 bg-white"
            />
          </div>

          <ScrollArea className="flex-grow p-8 bg-muted/20" ref={scrollAreaRef}>
            <div className="space-y-6 max-w-3xl mx-auto">
              {history.length === 0 && (
                <div className="text-center py-20 text-muted-foreground space-y-4">
                  <div className="size-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-primary/5">
                    <Bot className="size-10 text-primary/30" />
                  </div>
                  <p className="text-lg max-w-md mx-auto">{t('startInstruction')}</p>
                </div>
              )}
              {history.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === 'model' && (
                    <div className="size-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 shrink-0 mt-1">
                      <Bot size={20} />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl p-4 text-base shadow-sm leading-relaxed",
                      msg.role === 'user'
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-white border border-primary/10 rounded-tl-none"
                    )}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="size-10 rounded-2xl bg-white flex items-center justify-center text-muted-foreground border-2 border-primary/5 shadow-sm shrink-0 mt-1">
                      <User size={20} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="size-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
                    <Bot size={20} />
                  </div>
                  <div className="bg-white border border-primary/10 rounded-2xl rounded-tl-none p-5 shadow-sm">
                    <div className="flex gap-2">
                      <div className="size-2 bg-primary/30 rounded-full animate-bounce" />
                      <div className="size-2 bg-primary/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="size-2 bg-primary/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-8 bg-white border-t">
          <div className="max-w-3xl mx-auto w-full flex gap-3">
            <Input
              placeholder={t('chatPlaceholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading || lastResult?.status === 'analysis_complete'}
              className="flex-grow h-14 rounded-2xl border-primary/10 px-6 text-lg focus-visible:ring-primary shadow-inner bg-muted/30"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim() || lastResult?.status === 'analysis_complete'}
              className="size-14 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              <Send className="size-6" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {lastResult?.status === 'analysis_complete' && lastResult.analysis && (
        <Card className="border-primary/10 shadow-2xl rounded-[2.5rem] overflow-hidden glass-card animate-in fade-in zoom-in duration-500">
          <CardHeader className="bg-green-500/10 border-b p-8">
            <CardTitle className="text-2xl flex items-center gap-3 text-green-700">
              <AlertTriangle className="size-8" />
              {t('analysisTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-10">
            <div className="grid gap-8">
              {lastResult.analysis.map((item, idx) => (
                <div key={idx} className="space-y-3 group">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-foreground">{item.condition}</span>
                    <span className="text-2xl font-black text-primary">{item.probability}%</span>
                  </div>
                  <Progress value={item.probability} className="h-4 rounded-full bg-muted shadow-inner" />
                  <p className="text-base text-muted-foreground leading-relaxed italic">{item.reasoning}</p>
                </div>
              ))}
            </div>
            
            <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 rounded-2xl p-6">
              <AlertTitle className="text-lg font-bold mb-2 flex items-center gap-2">
                 <AlertTriangle className="size-5" />
                 {t('disclaimerTitle')}
              </AlertTitle>
              <AlertDescription className="text-sm leading-relaxed">
                {lastResult.disclaimer}
              </AlertDescription>
            </Alert>
            
            <Button onClick={resetTriage} variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold hover:bg-primary hover:text-white transition-all">
              {t('startOver')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}