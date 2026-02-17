
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
import { useTranslations } from '@/lib/i18n/use-translations';

export default function PreventiveHealthcarePage() {
  const t = useTranslations('PreventiveHealthcarePage');
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
        title: t('missingInfoTitle'),
        description: t('missingInfoDescription'),
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
        title: t('errorTitle'),
        description: t('errorDescription'),
      });
    } finally {
      setIsLoading(false);
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
              <Label htmlFor="disease">{t('diseaseLabel')}</Label>
              <Input
                id="disease"
                placeholder={t('diseasePlaceholder')}
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
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
          <CardHeader>
            <CardTitle>{t('loadingTitle')}</CardTitle>
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
                {t('resultsTitle', { disease })}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">{t('measuresTitle')}</h3>
              <p className="text-sm text-muted-foreground">{result.preventiveMeasures}</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                {t('guidanceTitle')}
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
