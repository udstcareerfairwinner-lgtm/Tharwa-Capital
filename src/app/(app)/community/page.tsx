"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { Users, Award, ChevronRight, Shield } from "lucide-react";
import { IslamicPattern } from "@/components/islamic-pattern";
import { shariaBoard } from "@/lib/data";

export default function CommunityPage() {
  const { language, translations: text, isRTL } = useLanguage();

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <header className="bg-gradient-to-br from-primary to-green-600 text-primary-foreground p-6 relative overflow-hidden">
        <IslamicPattern className="opacity-10" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-headline mb-1">{text.community}</h1>
          <p className="text-emerald-100">{text.connectWithInvestors}</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{text.activeInvestors}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{text.totalProjects}</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                </div>
                 <div>
                    <h2 className="text-lg font-bold font-headline text-foreground">{text.shariaBoard}</h2>
                    <p className="text-sm text-muted-foreground">{text.ensuringCompliance}</p>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {shariaBoard.map((member) => (
              <Link href={`/community/board/${member.id}`} key={member.id} className="block">
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <Image
                    src={member.image}
                    alt={member.name[language]}
                    width={48}
                    height={48}
                    className="rounded-full"
                    data-ai-hint={member.imageHint}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{member.name[language]}</h3>
                    <p className="text-sm text-muted-foreground">{member.role[language]}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="font-headline">Community Discussions</CardTitle>
                <CardDescription>Share insights and discuss opportunities. (Feature coming soon)</CardDescription>
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
