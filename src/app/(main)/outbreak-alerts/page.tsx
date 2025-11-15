import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default function OutbreakAlertsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Outbreak Alerts</CardTitle>
          <CardDescription>
            Stay informed about disease outbreaks in your area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the Outbreak Alerts content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
