
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { translations } from "@/lib/translations";
import { IslamicPattern } from "@/components/islamic-pattern";

export default function NotificationSettingsPage() {
  const lang = "en";
  const text = translations[lang];

  return (
    <div>
        <header className="bg-gradient-to-br from-primary to-green-600 text-primary-foreground p-6 relative overflow-hidden">
            <IslamicPattern className="opacity-10" />
            <div className="relative z-10">
                <h1 className="text-3xl font-bold font-headline mb-1">Notification Settings</h1>
            </div>
        </header>

        <div className="p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Manage Notifications</CardTitle>
                    <CardDescription>This feature is coming soon. You'll be able to customize your notification preferences here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center text-center p-10 bg-muted rounded-lg">
                        <p className="text-muted-foreground">Coming Soon</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
