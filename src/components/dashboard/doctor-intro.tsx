'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/i18n/use-translations';
import { X } from 'lucide-react';

export function DoctorIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { user } = useUser();
  const t = useTranslations('DoctorIntro');
  const doctorImg = PlaceHolderImages.find((img) => img.id === 'doctor-avatar');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 500);
  };

  return (
    <div
      className={cn(
        'fixed bottom-8 right-8 z-50 flex items-end gap-4 max-w-sm w-full md:max-w-md transition-all duration-700 ease-out',
        isClosing ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'
      )}
    >
      <div className="relative flex-1 bg-white rounded-3xl p-6 shadow-2xl border border-primary/20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 hover:bg-muted rounded-full transition-colors"
        >
          <X className="size-4 text-muted-foreground" />
        </button>
        <div className="space-y-2">
          <p className="text-primary font-bold text-sm tracking-wide uppercase">
            {t('greeting')}
          </p>
          <h3 className="text-xl font-bold text-foreground leading-tight">
            {user?.displayName ? t('welcomeWithName', { name: user.displayName.split(' ')[0] }) : t('welcome')}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            "{t('advice')}"
          </p>
        </div>
        {/* Speech bubble tail */}
        <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white border-r border-b border-primary/20 rotate-45 transform" />
      </div>

      <div className="shrink-0 animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
        <div className="relative size-24 md:size-32 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-primary/10">
          {doctorImg && (
            <Image
              src={doctorImg.imageUrl}
              alt={doctorImg.description}
              fill
              data-ai-hint={doctorImg.imageHint}
              className="object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
