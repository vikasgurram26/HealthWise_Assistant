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

export default function PreventiveHealthcarePage() {
  const [disease, setDisease] = useState('');
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
        title: 'Missing Information',
        description: 'Please enter a disease or condition.',
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
        title: 'An Error Occurred',
        description:
          'Failed to get information from the AI. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Preventive Healthcare</CardTitle>
          <CardDescription>
            Get AI-driven, evidence-based information on preventive healthcare
            measures.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="disease">Disease or Condition</Label>
              <Input
                id="disease"
                placeholder="e.g., Influenza, Diabetes Type 2"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Getting Information...' : 'Get Information'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Loading Preventive Measures...</CardTitle>
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
                Preventive Guidance for {disease}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Preventive Measures</h3>
              <p className="text-sm text-muted-foreground">{result.preventiveMeasures}</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Application Guidance
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
