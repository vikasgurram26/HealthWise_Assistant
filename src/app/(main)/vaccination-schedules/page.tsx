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

const ageGroups = [
  'Infant (0-12 months)',
  'Child (1-6 years)',
  'Child (7-12 years)',
  'Adolescent (13-18 years)',
  'Adult (19-64 years)',
  'Senior (65+ years)',
];

export default function VaccinationSchedulesPage() {
  const [ageGroup, setAgeGroup] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Vaccination[] | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ageGroup) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select an age group.',
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
        title: 'An Error Occurred',
        description:
          'Failed to get the schedule from the AI. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Vaccination Schedules</CardTitle>
          <CardDescription>
            Get AI-powered vaccination recommendations based on age group.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="age-group">Age Group</Label>
              <Select
                value={ageGroup}
                onValueChange={setAgeGroup}
                disabled={isLoading}
              >
                <SelectTrigger id="age-group" className="w-full md:w-1/2">
                  <SelectValue placeholder="Select an age group" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Getting Schedule...' : 'Get Schedule'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Loading Vaccination Schedule...</CardTitle>
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
              <CardTitle>Recommended Vaccinations for {ageGroup}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vaccine</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Schedule</TableHead>
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
