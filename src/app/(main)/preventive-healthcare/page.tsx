import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default function PreventiveHealthcarePage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Preventive Healthcare</CardTitle>
          <CardDescription>
            Get AI-driven, evidence-based information on preventive healthcare measures.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the Preventive Healthcare content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
