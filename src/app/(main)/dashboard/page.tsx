
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
import { useTranslations } from '@/lib/i18n/use-translations';
import { useUser } from '@/firebase';

export default function DashboardPage() {
  const t = useTranslations('DashboardPage');
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {user?.displayName ? t('welcomeUser', { name: user.displayName }) : t('title')}
        </h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
           {/* Stat Cards */}
          <Suspense fallback={<StatCardsLoading />}>
            <StatCards />
          </Suspense>
        </div>
        <div className="md:col-span-1">
           <GamificationCard />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Main News and Alerts */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <RecentAlerts />
          </Suspense>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">{t('healthTipTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic">
                "{t('healthTipContent')}"
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold px-1">{t('quickActions')}</h2>
          <SymptomCheckerCard />
          <PreventiveCareCard />
          <VaccinationCard />
        </div>
      </div>
    </div>
  );
}

function StatCardsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
      <Skeleton className="h-28" />
    </div>
  );
}
