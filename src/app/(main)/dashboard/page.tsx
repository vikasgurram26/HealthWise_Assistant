
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

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboardTitle')}</CardTitle>
          <CardDescription>
            {t('dashboardDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<StatCardsLoading />}>
            <StatCards />
          </Suspense>
        </CardContent>
      </Card>
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
