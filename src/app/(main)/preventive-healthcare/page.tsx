
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
import {
  getPreventiveHealthcareInfo,
  PreventiveHealthcareInfoOutput,
} from '@/ai/flows/preventive-healthcare-info';
import { ShieldCheck } from 'lucide-react';
import useLocalStorage from '@/hooks/use-local-storage';
import { useTranslation } from 'react-i18next';

export default function PreventiveHealthcarePage() {
  const { t } = useTranslation();
  const [disease, setDisease] = useLocalStorage('preventive-disease', '');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PreventiveHealthcareInfoOutput | null>(
    null
  );
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disease) {
      toast({
        variant: 'destructive',
        title: t('missingInfo'),
        description: t('enterDisease'),
      });
      return;
    }
    setIsLoading(true);
    setResult(null);

    try {
      const response = await getPreventiveHealthcareInfo({ disease });
      setResult(response);
    } catch (error) {
      console.error('Error getting preventive healthcare info:', error);
      toast({
        variant: 'destructive',
        title: t('errorOccurred'),
        description: t('failedToGetAIInfo'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('preventiveCareTitle')}</CardTitle>
          <CardDescription>
            {t('preventiveCareDescription')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="disease">{t('diseaseConditionLabel')}</Label>
              <Input
                id="disease"
                placeholder={t('diseaseConditionPlaceholder')}
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t('gettingInformation') : t('getInformation')}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>{t('loadingPreventiveMeasures')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="mt-6 h-4 w-[200px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-6 text-primary" />
              <CardTitle>
                {t('preventiveGuidanceFor', { disease })}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">{t('preventiveMeasures')}</h3>
              <p className="text-sm text-muted-foreground">{result.preventiveMeasures}</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                {t('applicationGuidance')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {result.applicationGuidance}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
