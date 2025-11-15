
'use client';

import { useState } from 'react';
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
import { AlertCircle, Archive, ShieldAlert, ShieldCheck } from 'lucide-react';
import { getFullOutbreakAlerts, OutbreakAlert } from '@/lib/outbreak-alerts';
import { Badge } from '@/components/ui/badge';
import useLocalStorage from '@/hooks/use-local-storage';
import { useTranslation } from 'react-i18next';

export default function OutbreakAlertsPage() {
  const { t } = useTranslation();
  const [location, setLocation] = useLocalStorage('outbreak-location', '');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<OutbreakAlert[] | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      toast({
        variant: 'destructive',
        title: t('missingInfo'),
        description: t('enterLocation'),
      });
      return;
    }
    setIsLoading(true);
    setResults(null);

    try {
      const response = await getFullOutbreakAlerts(location);
      setResults(response);
    } catch (error) {
      console.error('Error getting outbreak alerts:', error);
      toast({
        variant: 'destructive',
        title: t('errorOccurred'),
        description: t('failedToGetOutbreakAlerts'),
      });
    } finally {
      setIsLoading(false);
    }
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

  const activeAlerts = results?.filter((alert) => alert.status === 'Active');
  const pastAlerts = results?.filter((alert) => alert.status === 'Past');

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('outbreakAlertsTitle')}</CardTitle>
          <CardDescription>
            {t('outbreakAlertsDescription')}
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
              {isLoading ? t('checkingForAlerts') : t('checkAlerts')}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      )}

      {results && !isLoading && (
        <>
          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>
                {activeAlerts && activeAlerts.length > 0
                  ? t('activeOutbreakAlertsFor', { location })
                  : t('noActiveOutbreakAlertsFor', { location })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeAlerts && activeAlerts.length > 0 ? (
                activeAlerts.map((alert, index) => (
                  <Card key={`active-${index}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {getAlertIcon(alert.alertLevel)}
                          <CardTitle className="text-xl">
                            {alert.disease}
                          </CardTitle>
                        </div>
                        <Badge
                          variant={getAlertBadgeVariant(alert.alertLevel)}
                        >
                          {t(`${alert.alertLevel.toLowerCase()}Alert`)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {alert.description}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>{t('noActiveAlerts')}</p>
              )}
            </CardContent>
          </Card>

          {/* Past Alerts */}
          {pastAlerts && pastAlerts.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Archive className="size-6 text-muted-foreground" />
                  <CardTitle>
                    {t('pastOutbreakAlertsFor', { location })}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {pastAlerts.map((alert, index) => (
                  <Card key={`past-${index}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {getAlertIcon(alert.alertLevel)}
                          <CardTitle className="text-xl">
                            {alert.disease}
                          </CardTitle>
                        </div>
                        <Badge
                          variant='outline'
                        >
                          {t(`${alert.alertLevel.toLowerCase()}Alert`)}{t('pastAlert')}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {alert.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
