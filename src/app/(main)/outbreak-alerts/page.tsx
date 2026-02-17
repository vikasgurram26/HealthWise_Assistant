
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowRight, ShieldAlert, ShieldCheck } from 'lucide-react';
import { getFullOutbreakAlerts, OutbreakAlert } from '@/lib/outbreak-alerts';
import { Badge } from '@/components/ui/badge';
import useLocalStorage from '@/hooks/use-local-storage';
import Link from 'next/link';
import { useTranslations } from '@/lib/i18n/use-translations';

export default function OutbreakAlertsPage() {
  const t = useTranslations('OutbreakAlertsPage');
  const [location, setLocation] = useLocalStorage('outbreak-location', '');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<OutbreakAlert[] | null>(null);
  const { toast } = useToast();

  const fetchAlerts = async (loc: string) => {
    setIsLoading(true);
    setResults(null);
    try {
      const response = await getFullOutbreakAlerts(loc);
      setResults(response);
    } catch (error) {
      console.error('Error getting outbreak alerts:', error);
      toast({
        variant: 'destructive',
        title: t('errorTitle'),
        description: t('errorDescription'),
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch initial alerts when the component mounts
  useEffect(() => {
    fetchAlerts(location);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('title'),
      description: t('toastDescription'),
    });
    fetchAlerts(location);
  };

  const getAlertIcon = (level: 'High' | 'Medium' | 'Low') => {
    switch (level) {
      case 'High':
        return <ShieldAlert className="size-6 text-destructive" />;
      case 'Medium':
        return <AlertCircle className="size-6 text-yellow-500" />;
      case 'Low':
        return <ShieldCheck className="size-6 text-green-500" />;
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="location">{t('locationLabel')}</Label>
              <Input
                id="location"
                placeholder={t('locationPlaceholder')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t('loadingButton') : t('button')}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      )}

      {results && !isLoading && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>
                {results && results.length > 0
                  ? t('resultsTitle')
                  : t('noResultsTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results && results.length > 0 ? (
                results.map((alert, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-1">
                          <CardTitle className="text-lg leading-tight">
                            {alert.disease}
                          </CardTitle>
                           <p className="text-xs text-muted-foreground">
                            {new Date(alert.pubDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">
                        {alert.description}
                      </p>
                       <Button asChild variant="outline" size="sm">
                        <Link href={alert.url} target="_blank" rel="noopener noreferrer">
                          {t('readMore')} <ArrowRight className="ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>{t('noResultsMessage')}</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
