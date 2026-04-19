
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
      
      // Streak logic: check if last check-in was yesterday
      const lastDate = profile.lastCheckIn ? new Date(profile.lastCheckIn) : null;
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
    <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          {t('healthScore')}
        </CardTitle>
        <div className="text-2xl font-black text-primary">
          {profile.healthScore || 0}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className={cn("size-5", profile.dailyStreak ? "text-orange-500 fill-orange-500" : "text-muted-foreground")} />
            <span className="text-sm font-medium">{t('streak')}</span>
          </div>
          <span className="text-sm font-bold bg-muted px-2 py-1 rounded">
            {t('days', { count: profile.dailyStreak || 0 })}
          </span>
        </div>
        
        <Button 
          onClick={handleCheckIn} 
          disabled={hasCheckedInToday || isUpdating}
          className={cn("w-full transition-all duration-300", hasCheckedInToday && "bg-green-500 hover:bg-green-600")}
        >
          {hasCheckedInToday ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
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
