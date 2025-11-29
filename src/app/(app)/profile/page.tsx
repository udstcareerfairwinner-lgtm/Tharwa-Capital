"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { IslamicPattern } from "@/components/islamic-pattern";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronRight, LogOut, Bell, UserCog } from "lucide-react";
import { investments } from "@/lib/data";
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";

export default function ProfilePage() {
  const { language, translations: text, isRTL } = useLanguage();

  const user = {
    name: "Abdullah Al-Farsi",
    email: "abdullah.f@email.com",
    avatar: PlaceHolderImages.find((img) => img.id === "user-avatar")?.imageUrl || "",
    stats: {
      totalInvested: "12,500 QAR",
      portfolioValue: "13,562 QAR",
      portfolioReturn: "+8.5%",
      projectsBacked: 5,
    },
  };

  const userInvestments = investments.slice(0, 3); // Dummy data

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <header className="bg-gradient-to-br from-primary via-emerald-600 to-green-600 text-primary-foreground p-6 relative overflow-hidden shadow-lg">
        <IslamicPattern className="opacity-10" />
        <div className="relative z-10 flex items-center gap-4">
          <Image
            src={user.avatar}
            alt={user.name}
            width={64}
            height={64}
            className="rounded-full border-2 border-amber-300"
            data-ai-hint="person smiling"
          />
          <div>
            <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
            <p className="text-emerald-100 text-sm">{user.email}</p>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{text.portfolio}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">{text.totalInvested}</p>
                <p className="text-xl font-bold text-foreground">{user.stats.totalInvested}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{text.returns}</p>
                <p className="text-xl font-bold text-green-600">{user.stats.portfolioReturn}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Briefcase size={20} /> {text.myInvestments.replace('{count}', user.stats.projectsBacked.toString())}
                </CardTitle>
                <CardDescription>{text.myInvestmentsDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {userInvestments.map(investment => (
                    <Link href={`/marketplace/${investment.id}`} key={investment.id}>
                        <div className="p-3 rounded-lg border bg-background hover:bg-muted/50 flex items-center gap-4 transition-colors">
                            <Image src={investment.image} alt={investment.title[language]} width={64} height={64} className="rounded-md object-cover h-16 w-16" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-foreground truncate">{investment.title[language]}</h3>
                                <p className="text-sm text-muted-foreground">{investment.category[language]}</p>
                                <div className="mt-1 flex items-center gap-2 text-xs">
                                    <Progress value={(investment.invested/investment.goal)*100} className="h-1.5 w-20"/>
                                    <span className="text-muted-foreground">{((investment.invested/investment.goal)*100).toFixed(0)}% {text.funded}</span>
                                </div>
                            </div>
                             <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </Link>
                ))}
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">{text.accountSettings}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-1">
                    <Button variant="ghost" className="justify-start -ml-4" asChild>
                        <Link href="/profile/edit">
                            <UserCog className="mr-2"/> {text.editProfile}
                        </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start -ml-4" asChild>
                       <Link href="/profile/notifications">
                            <Bell className="mr-2"/> {text.notificationSettings}
                        </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start text-destructive hover:text-destructive -ml-4"><LogOut className="mr-2"/> {text.logOut}</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
