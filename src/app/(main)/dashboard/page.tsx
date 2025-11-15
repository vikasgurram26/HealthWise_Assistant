
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
import { getTranslations } from '@/lib/server-i18n';

export default async function DashboardPage() {
  const { t } = await getTranslations();
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">
          {t('dashboard.description')}
        </p>
      </div>

      {/* Stat Cards */}
      <Suspense fallback={<StatCardsLoading />}>
        <StatCards />
      </Suspense>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-64" />}>
            <RecentAlerts />
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
