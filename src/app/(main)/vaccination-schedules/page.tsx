import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default function VaccinationSchedulesPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Vaccination Schedules</CardTitle>
          <CardDescription>
            Track and manage vaccination schedules for you and your family.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the Vaccination Schedules content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
