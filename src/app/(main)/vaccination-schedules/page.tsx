
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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getVaccinationSchedule,
  Vaccination,
} from '@/ai/flows/vaccination-schedule-flow';
import { Syringe } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/lib/i18n/use-translations';

export default function VaccinationSchedulesPage() {
  const t = useTranslations('VaccinationSchedulesPage');
  const [ageGroup, setAgeGroup] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Vaccination[] | null>(null);
  const { toast } = useToast();

  const ageGroups = [
    { value: 'Infant (0-12 months)', label: t('ageGroups.infant') },
    { value: 'Child (1-6 years)', label: t('ageGroups.child1_6') },
    { value: 'Child (7-12 years)', label: t('ageGroups.child7_12') },
    { value: 'Adolescent (13-18 years)', label: t('ageGroups.adolescent') },
    { value: 'Adult (19-64 years)', label: t('ageGroups.adult') },
    { value: 'Senior (65+ years)', label: t('ageGroups.senior') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ageGroup) {
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
      const response = await getVaccinationSchedule({ ageGroup });
      setResult(response.recommendations);
    } catch (error) {
      console.error('Error getting vaccination schedule:', error);
      toast({
        variant: 'destructive',
        title: t('errorTitle'),
        description: t('errorDescription'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAgeGroupLabel = (value: string) => {
    return ageGroups.find(g => g.value === value)?.label || value;
  }

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
              <Label htmlFor="age-group">{t('ageGroupLabel')}</Label>
              <Select
                value={ageGroup}
                onValueChange={setAgeGroup}
                disabled={isLoading}
              >
                <SelectTrigger id="age-group" className="w-full md:w-1/2">
                  <SelectValue placeholder={t('ageGroupPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Syringe className="size-6 text-primary" />
              <CardTitle>{t('resultsTitle', { ageGroup: getAgeGroupLabel(ageGroup) })}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('vaccineHeader')}</TableHead>
                  <TableHead>{t('purposeHeader')}</TableHead>
                  <TableHead>{t('scheduleHeader')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.map((vaccine, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{vaccine.vaccine}</TableCell>
                    <TableCell>{vaccine.purpose}</TableCell>
                    <TableCell>{vaccine.schedule}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
