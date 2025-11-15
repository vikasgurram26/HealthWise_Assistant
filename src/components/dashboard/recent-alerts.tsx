
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getFullOutbreakAlerts, OutbreakAlert } from '@/lib/outbreak-alerts';
import { AlertCircle, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

const getAlertIcon = (level: 'High' | 'Medium' | 'Low') => {
  switch (level) {
    case 'High':
      return <ShieldAlert className="size-5 text-destructive" />;
    case 'Medium':
      return <AlertCircle className="size-5 text-yellow-500" />;
    case 'Low':
      return <ShieldCheck className="size-5 text-green-500" />;
  }
};

const getAlertBadgeVariant = (level: 'High' | 'Medium' | 'Low') => {
  switch (level) {
    case 'High':
      return 'destructive';
    case 'Medium':
      return 'secondary';
    case 'Low':
      return 'default';
    default:
      return 'outline';
  }
};

export function RecentAlerts() {
  const { t } = useTranslation();
  const [activeAlerts, setActiveAlerts] = useState<OutbreakAlert[] | null>(null);

  useEffect(() => {
    getFullOutbreakAlerts('').then(allAlerts => {
      const filteredAlerts = allAlerts
        .filter((alert) => alert.status === 'Active')
        .slice(0, 3); // Show top 3
      setActiveAlerts(filteredAlerts);
    });
  }, []);


  if (!activeAlerts) {
    return <Skeleton className="h-64" />;
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{t('recentOutbreakAlerts')}</CardTitle>
        <CardDescription>{t('recentOutbreakAlertsDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {activeAlerts.length > 0 ? (
          activeAlerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border p-3"
            >
              <div className="mt-1">{getAlertIcon(alert.alertLevel)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{alert.disease}</h4>
                  <Badge variant={getAlertBadgeVariant(alert.alertLevel)}>
                    {t(`${alert.alertLevel.toLowerCase()}Alert`)}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {alert.description.substring(0, 100)}
                  {alert.description.length > 100 ? '...' : ''}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">{t('noActiveAlerts')}</p>
          </div>
        )}
      </CardContent>
      <div className="border-t p-4">
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href="/outbreak-alerts">
            {t('viewAllAlerts')}
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
