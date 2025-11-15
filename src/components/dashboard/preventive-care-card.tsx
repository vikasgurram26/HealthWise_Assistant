
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
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function PreventiveCareCard() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">{t('preventiveCare')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {t('preventiveCareCardDescription')}
        </p>
        <Button asChild className="w-full">
          <Link href="/preventive-healthcare">
            {t('getPreventionTips')}
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
