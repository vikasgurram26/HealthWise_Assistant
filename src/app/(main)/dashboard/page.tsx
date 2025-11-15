import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Welcome to your HealthWise Assistant. Here is a quick overview of your health information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the Dashboard content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
