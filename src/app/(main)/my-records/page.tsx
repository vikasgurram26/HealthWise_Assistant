
'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/lib/i18n/use-translations';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { format, parseISO } from 'date-fns';
import { PlusCircle } from 'lucide-react';

const recordFormSchema = z.object({
  vaccine: z.string().min(1, 'Vaccine name is required.'),
  dose: z.string().min(1, 'Dose is required.'),
  dateAdministered: z.date({
    required_error: 'Date of administration is required.',
  }),
});

type VaccinationRecord = {
  id: string;
  vaccine: string;
  dose: string;
  dateAdministered: string;
};

export default function MyRecordsPage() {
  const t = useTranslations('MyRecordsPage');
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recordsPath = user ? `userProfiles/${user.uid}/vaccinationRecords` : null;
  const { data: records, loading } = useCollection<VaccinationRecord>(recordsPath);

  const form = useForm<z.infer<typeof recordFormSchema>>({
    resolver: zodResolver(recordFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof recordFormSchema>) => {
    if (!user || !firestore) return;
    setIsSubmitting(true);
    try {
      const recordsCollection = collection(firestore, `userProfiles/${user.uid}/vaccinationRecords`);
      await addDoc(recordsCollection, {
        vaccine: data.vaccine,
        dose: data.dose,
        dateAdministered: format(data.dateAdministered, 'yyyy-MM-dd'),
        userProfileId: user.uid,
        createdAt: serverTimestamp(),
      });
      toast({ title: t('addRecordTitle'), description: `${data.vaccine} has been added.` });
      form.reset({vaccine: '', dose: '', dateAdministered: undefined});
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        variant: 'destructive',
        title: t('errorTitle'),
        description: t('errorDescription'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
            {!loading && records && records.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('tableHeaderVaccine')}</TableHead>
                    <TableHead>{t('tableHeaderDose')}</TableHead>
                    <TableHead>{t('tableHeaderDate')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.sort((a, b) => new Date(b.dateAdministered).getTime() - new Date(a.dateAdministered).getTime()).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.vaccine}</TableCell>
                      <TableCell>{record.dose}</TableCell>
                      <TableCell>{format(parseISO(record.dateAdministered), 'PPP')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {!loading && (!records || records.length === 0) && (
              <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">{t('noRecords')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="size-5" /> {t('addRecordTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="vaccine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('vaccineNameLabel')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('vaccineNamePlaceholder')} {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('doseLabel')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('dosePlaceholder')} {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateAdministered"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('dateAdministeredLabel')}</FormLabel>
                      <DatePicker date={field.value} setDate={field.onChange} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? t('addingButton') : t('addButton')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
