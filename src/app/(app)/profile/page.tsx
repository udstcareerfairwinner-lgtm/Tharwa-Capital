import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { translations } from "@/lib/translations";

export default function ProfilePage() {
  const lang = "en"; // Defaulting to English for this server component
  const text = translations[lang];

  return (
    <div>
      <header className="bg-gradient-to-br from-primary to-green-600 text-primary-foreground p-6">
        <h1 className="text-3xl font-bold font-headline">{text.profile}</h1>
      </header>
      <div className="p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is under construction.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
