
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getFullOutbreakAlerts, OutbreakAlert } from '@/lib/outbreak-alerts';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, Newspaper } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export function RecentAlerts() {
  const [recentAlerts, setRecentAlerts] = useState<OutbreakAlert[] | null>(null);

  useEffect(() => {
    getFullOutbreakAlerts('').then(allAlerts => {
      const sortedAlerts = allAlerts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      setRecentAlerts(sortedAlerts.slice(0, 3)); // Show top 3 most recent
    });
  }, []);


  if (!recentAlerts) {
    return <Skeleton className="h-64" />;
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Recent WHO News</CardTitle>
        <CardDescription>The latest news from the World Health Organization.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {recentAlerts.length > 0 ? (
          recentAlerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border p-3"
            >
              <div className="mt-1 text-primary"><Newspaper /></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{alert.disease}</h4>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {alert.description.substring(0, 100)}
                  {alert.description.length > 100 ? '...' : ''}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(alert.pubDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Could not fetch recent news from WHO.</p>
          </div>
        )}
      </CardContent>
      <div className="border-t p-4">
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href="/outbreak-alerts">
            View All News & Alerts
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
