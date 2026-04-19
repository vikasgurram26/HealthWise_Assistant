'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { StatCards } from '@/components/dashboard/stat-cards';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { RecentAlerts } from '@/components/dashboard/recent-alerts';
import { SymptomCheckerCard } from '@/components/dashboard/symptom-checker-card';
import { PreventiveCareCard } from '@/components/dashboard/preventive-care-card';
import { VaccinationCard } from '@/components/dashboard/vaccination-card';
import { GamificationCard } from '@/components/dashboard/gamification-card';
import { DoctorIntro } from '@/components/dashboard/doctor-intro';
import { useTranslations } from '@/lib/i18n/use-translations';
import { useUser } from '@/firebase';
import { Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const t = useTranslations('DashboardPage');
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-8 pb-10">
      <DoctorIntro />
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 text-primary-foreground shadow-2xl md:p-12">
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <Sparkles className="size-5" />
            <span className="text-sm font-medium tracking-wider uppercase">{t('title')}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {user?.displayName ? t('welcomeUser', { name: user.displayName }) : t('title')}
          </h1>
          <p className="max-w-2xl text-lg text-primary-foreground/90 leading-relaxed">
            {t('description')}
          </p>
        </div>
        <div className="absolute -right-10 -top-10 size-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 size-64 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-3">
          <Suspense fallback={<StatCardsLoading />}>
            <StatCards />
          </Suspense>
        </div>
        <div className="md:col-span-1">
          <GamificationCard />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-2xl" />}>
            <RecentAlerts />
          </Suspense>
          
          <Card className="border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 interactive-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-primary">{t('healthTipTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg italic leading-relaxed text-muted-foreground/80">
                "{t('healthTipContent')}"
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight px-1 flex items-center gap-2">
            {t('quickActions')}
          </h2>
          <div className="grid gap-6">
            <SymptomCheckerCard />
            <PreventiveCareCard />
            <VaccinationCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCardsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
  );
}
