'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Zap, CheckCircle2 } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/use-translations';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function GamificationCard() {
  const t = useTranslations('GamificationCard');
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const profilePath = user ? `userProfiles/${user.uid}` : null;
  const { data: profile, loading } = useDoc<{
    healthScore?: number;
    dailyStreak?: number;
    lastCheckIn?: string;
  }>(profilePath);

  const today = format(new Date(), 'yyyy-MM-dd');
  const hasCheckedInToday = profile?.lastCheckIn === today;

  const handleCheckIn = async () => {
    if (!user || !firestore || !profile || hasCheckedInToday || isUpdating) return;

    setIsUpdating(true);
    try {
      const userRef = doc(firestore, 'userProfiles', user.uid);
      const currentScore = profile.healthScore || 0;
      const currentStreak = profile.dailyStreak || 0;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayFormatted = format(yesterday, 'yyyy-MM-dd');
      
      let newStreak = 1;
      if (profile.lastCheckIn === yesterdayFormatted) {
        newStreak = currentStreak + 1;
      } else if (profile.lastCheckIn === today) {
        newStreak = currentStreak;
      }

      await updateDoc(userRef, {
        healthScore: currentScore + 10,
        dailyStreak: newStreak,
        lastCheckIn: today,
      });

      toast({
        title: t('reward'),
        description: t('description'),
      });
    } catch (error) {
      console.error('Error checking in:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || !profile) return null;

  return (
    <Card className="h-full bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20 shadow-xl rounded-3xl overflow-hidden interactive-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Trophy className="text-yellow-500 size-6" />
          {t('healthScore')}
        </CardTitle>
        <div className="text-3xl font-black text-primary drop-shadow-sm">
          {profile.healthScore || 0}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2">
           <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className={cn("size-6 transition-all", profile.dailyStreak ? "text-orange-500 fill-orange-500 scale-110" : "text-muted-foreground")} />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-tight">{t('streak')}</span>
            </div>
            <span className="text-lg font-bold bg-white border px-3 py-1 rounded-full shadow-sm">
              {t('days', { count: profile.dailyStreak || 0 })}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
             <div 
               className="h-full bg-primary transition-all duration-1000" 
               style={{ width: `${Math.min(((profile.dailyStreak || 0) % 7) / 7 * 100 + 5, 100)}%` }}
             />
          </div>
          <p className="text-[10px] text-muted-foreground text-right">{t('days', { count: (7 - ((profile.dailyStreak || 0) % 7)) })} left for bonus</p>
        </div>
        
        <Button 
          onClick={handleCheckIn} 
          disabled={hasCheckedInToday || isUpdating}
          className={cn(
            "w-full h-12 rounded-2xl text-base font-bold transition-all shadow-lg active:scale-95",
            hasCheckedInToday ? "bg-green-500 hover:bg-green-600 shadow-green-200" : "bg-primary hover:bg-primary/90 shadow-primary/20"
          )}
        >
          {hasCheckedInToday ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-5" />
              {t('checkedIn')}
            </span>
          ) : (
            t('checkIn')
          )}
        </Button>
      </CardContent>
    </Card>
  );
}