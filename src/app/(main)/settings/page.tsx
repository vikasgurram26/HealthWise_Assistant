import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account and application settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the Settings content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
