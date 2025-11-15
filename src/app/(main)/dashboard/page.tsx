
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
import { useTranslation } from 'react-i18next';
import { RecentAlerts } from '@/components/dashboard/recent-alerts';
import { SymptomCheckerCard } from '@/components/dashboard/symptom-checker-card';
import { PreventiveCareCard } from '@/components/dashboard/preventive-care-card';
import { VaccinationCard } from '@/components/dashboard/vaccination-card';

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboardTitle')}</h1>
        <p className="text-muted-foreground">
          {t('dashboardDescription')}
        </p>
      </div>

      {/* Stat Cards */}
      <Suspense fallback={<StatCardsLoading />}>
        <StatCards t={t} />
      </Suspense>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-64" />}>
            <RecentAlerts t={t} />
          </Suspense>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
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
