
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getFullOutbreakAlerts, OutbreakAlert } from '@/lib/outbreak-alerts';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowUpRight, Newspaper, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { useTranslations } from '@/lib/i18n/use-translations';

export function RecentAlerts() {
  const [recentAlerts, setRecentAlerts] = useState<OutbreakAlert[] | null>(null);
  const t = useTranslations('RecentAlerts');

  useEffect(() => {
    getFullOutbreakAlerts('').then(allAlerts => {
      const sortedAlerts = allAlerts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      setRecentAlerts(sortedAlerts.slice(0, 4)); // Show top 4 most recent
    });
  }, []);

  if (!recentAlerts) {
    return (
      <Card className="flex h-[500px] flex-col">
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">{t('title')}</CardTitle>
          <p className="text-sm text-muted-foreground">{t('description')}</p>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/outbreak-alerts">
            {t('viewAll')}
            <ArrowUpRight className="ml-2 size-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {recentAlerts.length > 0 ? (
          recentAlerts.map((alert, index) => (
            <div
              key={index}
              className="group relative flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="mt-1 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Newspaper className="size-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold leading-none group-hover:text-primary transition-colors">
                    {alert.disease}
                  </h4>
                  <Link 
                    href={alert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                    title={t('openSource')}
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {alert.description.replace(/<[^>]*>?/gm, '')}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {new Date(alert.pubDate).toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  <Link 
                    href={alert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    {t('readFullArticle')}
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-64 items-center justify-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">{t('fetchError')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
