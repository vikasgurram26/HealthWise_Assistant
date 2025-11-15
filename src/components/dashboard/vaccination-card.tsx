
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Syringe } from 'lucide-react';

export function VaccinationCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Syringe />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">Vaccination Schedules</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Get vaccination schedules based on age group.
        </p>
        <Button asChild className="w-full">
          <Link href="/vaccination-schedules">
            View Schedules
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
