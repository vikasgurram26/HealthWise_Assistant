'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { generateWelcomeVideo } from '@/ai/flows/welcome-video-flow';
import { Bot, Loader2, Sparkles, X } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/use-translations';

export function WelcomeVideoOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { user, loading } = useUser();
  const t = useTranslations('DoctorIntro');

  useEffect(() => {
    // For testing and visibility, we show the welcome video on every refresh
    // Previously we used sessionStorage to only show it once.
    if (!loading && user) {
      setIsOpen(true);
      handleGenerate();
    }
  }, [user, loading]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateWelcomeVideo();
      setVideoUrl(result.videoDataUri);
    } catch (error) {
      console.error('Failed to generate welcome video:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none bg-transparent shadow-none sm:rounded-[2rem]">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-[2.1rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse" />
          
          <div className="relative bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl border border-primary/10">
            <div className="aspect-video bg-muted relative flex items-center justify-center">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                  <div className="relative">
                    <Loader2 className="size-16 text-primary animate-spin" />
                    <Bot className="size-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary animate-pulse">Initializing Medical AI...</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Our robotic assistant is preparing a custom welcome video for you.
                    </p>
                  </div>
                </div>
              ) : videoUrl ? (
                <video 
                  src={videoUrl} 
                  autoPlay 
                  loop 
                  className="size-full object-cover"
                />
              ) : (
                <div className="text-center p-8 space-y-4">
                   <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                     <Bot className="size-10 text-primary" />
                   </div>
                   <p className="text-muted-foreground">The AI assistant is having trouble connecting, but we are glad you are here!</p>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all"
              >
                <X className="size-5" />
              </Button>
            </div>

            <div className="p-8 text-center space-y-4 bg-gradient-to-b from-white to-primary/5">
              <div className="flex items-center justify-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                <Sparkles className="size-4" />
                <span>Next-Gen Care</span>
              </div>
              <DialogTitle className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
                {user?.displayName ? t('welcomeWithName', { name: user.displayName.split(' ')[0] }) : t('welcome')}
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                "{t('advice')}"
              </DialogDescription>
              <div className="pt-4">
                <Button 
                  onClick={() => setIsOpen(false)}
                  className="w-full md:w-auto px-12 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                >
                  Start My Health Journey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
