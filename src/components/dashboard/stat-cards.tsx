
'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { getGlobalHealthData, type GlobalHealthData } from '@/lib/data';
  import { Users, AlertCircle, ShieldCheck, HeartPulse } from 'lucide-react';
  import { useEffect, useState } from 'react';
  
  export function StatCards() {
    const [data, setData] = useState<GlobalHealthData | null>(null);

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
        title: 'Total Cases',
        value: data.cases.toLocaleString(),
        change: `+${data.todayCases.toLocaleString()} Today`,
        icon: <Users className="h-4 w-4 text-muted-foreground" />,
        changeColor: 'text-red-500',
      },
      {
        title: 'Total Deaths',
        value: data.deaths.toLocaleString(),
        change: `+${data.todayDeaths.toLocaleString()} Today`,
        icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
        changeColor: 'text-red-500',
      },
      {
        title: 'Total Recovered',
        value: data.recovered.toLocaleString(),
        change: `+${data.todayRecovered.toLocaleString()} Today`,
        icon: <ShieldCheck className="h-4 w-4 text-muted-foreground" />,
        changeColor: 'text-green-500',
      },
      {
        title: 'Active Cases',
        value: data.active.toLocaleString(),
        change: 'Worldwide',
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
