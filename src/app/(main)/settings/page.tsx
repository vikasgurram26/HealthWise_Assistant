
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
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/use-local-storage';
import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [name, setName] = useLocalStorage('settings-name', 'Example User');
  const [email, setEmail] = useLocalStorage('settings-email', 'user@example.com');
  const [outbreakAlerts, setOutbreakAlerts] = useLocalStorage('settings-outbreakAlerts', true);
  const [healthTips, setHealthTips] = useLocalStorage('settings-healthTips', false);
  const [newsletter, setNewsletter] = useLocalStorage('settings-newsletter', true);

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate saving settings
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: t('settingsSaved'),
        description: t('settingsSavedDescription'),
      });
    }, 1500);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settingsTitle')}</CardTitle>
          <CardDescription>
            {t('settingsDescription')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSaveChanges}>
          <CardContent className="space-y-8">
            {/* Profile Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t('profileSectionTitle')}</h3>
              <div className="space-y-2">
                <Label htmlFor="name">{t('nameLabel')}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('emailLabel')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSaving}
                />
              </div>
            </div>

            <Separator />

            {/* Notifications Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t('notificationsSectionTitle')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('notificationsDescription')}
              </p>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="outbreak-alerts">{t('outbreakAlertsToggleLabel')}</Label>
                  <p className="text-xs text-muted-foreground">
                    {t('outbreakAlertsToggleDescription')}
                  </p>
                </div>
                <Switch
                  id="outbreak-alerts"
                  checked={outbreakAlerts}
                  onCheckedChange={setOutbreakAlerts}
                  disabled={isSaving}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="health-tips">{t('healthTipsToggleLabel')}</Label>
                  <p className="text-xs text-muted-foreground">
                    {t('healthTipsToggleDescription')}
                  </p>
                </div>
                <Switch
                  id="health-tips"
                  checked={healthTips}
                  onCheckedChange={setHealthTips}
                  disabled={isSaving}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="newsletter">{t('newsletterToggleLabel')}</Label>
                  <p className="text-xs text-muted-foreground">
                    {t('newsletterToggleDescription')}
                  </p>
                </div>
                <Switch
                  id="newsletter"
                  checked={newsletter}
                  onCheckedChange={setNewsletter}
                  disabled={isSaving}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? t('saving') : t('saveChanges')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
