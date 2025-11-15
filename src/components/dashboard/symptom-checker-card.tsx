
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight, HeartPulse } from 'lucide-react';

export function SymptomCheckerCard() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <HeartPulse />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">{t('symptomGuidance')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {t('symptomGuidanceCardDescription')}
        </p>
        <Button asChild className="w-full">
          <Link href="/symptom-guidance">
            {t('checkSymptoms')}
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
