
'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { getGlobalHealthData, type GlobalHealthData } from '@/lib/data';
  import { useTranslations } from '@/lib/i18n/use-translations';
  import { Users, AlertCircle, ShieldCheck, HeartPulse } from 'lucide-react';
  import { useEffect, useState } from 'react';
  
  export function StatCards() {
    const [data, setData] = useState<GlobalHealthData | null>(null);
    const t = useTranslations('StatCards');

    useEffect(() => {
      getGlobalHealthData().then(setData);
    }, []);
  
    if (!data) {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
           <Skeleton className="h-28" />
           <Skeleton className="h-28" />
           <Skeleton className="h-28" />
           <Skeleton className="h-28" />
        </div>
      );
    }

    const stats = [
      {
        title: t('totalCases'),
        value: data.cases.toLocaleString(),
        change: t('today', { count: data.todayCases.toLocaleString() }),
        icon: <Users className="h-4 w-4 text-muted-foreground" />,
        changeColor: 'text-red-500',
      },
      {
        title: t('totalDeaths'),
        value: data.deaths.toLocaleString(),
        change: t('today', { count: data.todayDeaths.toLocaleString() }),
        icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
        changeColor: 'text-red-500',
      },
      {
        title: t('totalRecovered'),
        value: data.recovered.toLocaleString(),
        change: t('today', { count: data.todayRecovered.toLocaleString() }),
        icon: <ShieldCheck className="h-4 w-4 text-muted-foreground" />,
        changeColor: 'text-green-500',
      },
      {
        title: t('activeCases'),
        value: data.active.toLocaleString(),
        change: t('worldwide'),
        icon: <HeartPulse className="h-4 w-4 text-muted-foreground" />,
        changeColor: 'text-muted-foreground',
      },
    ];
  
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeColor}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

import { Skeleton } from '../ui/skeleton';
