import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default function SymptomGuidancePage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Symptom Guidance</CardTitle>
          <CardDescription>
            Enter your symptoms to get guidance on possible conditions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the Symptom Guidance content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
