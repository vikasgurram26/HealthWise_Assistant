
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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import {
  symptomGuidance,
  SymptomGuidanceOutput,
} from '@/ai/flows/symptom-guidance';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import useLocalStorage from '@/hooks/use-local-storage';
import { useTranslation } from 'react-i18next';

export default function SymptomGuidancePage() {
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useLocalStorage('symptom-symptoms', '');
  const [location, setLocation] = useLocalStorage('symptom-location', '');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SymptomGuidanceOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms || !location) {
      toast({
        variant: 'destructive',
        title: t('missingInfo'),
        description: t('enterSymptomsAndLocation'),
      });
      return;
    }
    setIsLoading(true);
    setResult(null);

    try {
      const response = await symptomGuidance({ symptoms, location });
      setResult(response);
    } catch (error) {
      console.error('Error getting symptom guidance:', error);
      toast({
        variant: 'destructive',
        title: t('errorOccurred'),
        description: t('failedToGetAIGuidance'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('symptomGuidanceTitle')}</CardTitle>
          <CardDescription>{t('symptomGuidanceDescription')}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="symptoms">{t('symptomsLabel')}</Label>
              <Textarea
                id="symptoms"
                placeholder={t('symptomsPlaceholder')}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                disabled={isLoading}
              />
            </div>
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
              {isLoading ? t('gettingGuidance') : t('getGuidance')}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>{t('analysisInProgress')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[300px]" />
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>{t('possibleConditions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{result.possibleConditions}</p>
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>{t('disclaimer')}</AlertTitle>
              <AlertDescription>
                {result.disclaimer}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
