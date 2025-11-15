
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, HeartPulse } from 'lucide-react';

export function SymptomCheckerCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <HeartPulse />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">Symptom Checker</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Check your symptoms and get AI-powered guidance.
        </p>
        <Button asChild className="w-full">
          <Link href="/symptom-guidance">
            Check Symptoms
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
