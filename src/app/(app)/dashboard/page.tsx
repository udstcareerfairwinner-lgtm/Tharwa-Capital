"use client";

import { IslamicPattern } from "@/components/islamic-pattern";
import { LanguageToggle } from "@/components/language-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ChevronRight, Shield, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { investments } from "@/lib/data";
import { InvestmentCard } from "@/components/investment-card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from 'next/link';

export default function DashboardPage() {
  const { translations: text, isRTL } = useLanguage();

  const userAvatar =
    PlaceHolderImages.find((img) => img.id === "user-avatar")?.imageUrl || "";

  return (
    <div className="bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <header className="bg-gradient-to-br from-primary via-emerald-600 to-green-600 text-primary-foreground p-6 relative overflow-hidden shadow-lg">
        <IslamicPattern className="opacity-10" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Image
                src={userAvatar}
                alt="User Avatar"
                width={48}
                height={48}
                className="rounded-full border-2 border-amber-300"
                data-ai-hint="person smiling"
              />
              <div>
                <h1 className="text-2xl font-bold font-headline">
                  {text.appName}
                </h1>
                <p className="text-emerald-100 text-sm">{text.tagline}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <LanguageToggle />
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-3">
                <p className="text-emerald-100 text-xs mb-1">
                  {text.totalInvested}
                </p>
                <p className="text-xl font-bold">12,500 QAR</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-3">
                <p className="text-emerald-100 text-xs mb-1">{text.returns}</p>
                <p className="text-xl font-bold text-accent">+8.5%</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-3">
                <p className="text-emerald-100 text-xs mb-1">
                  {text.activeProjects}
                </p>
                <p className="text-xl font-bold">5</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6">
        <Link href="/community">
        <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold font-headline text-foreground">
                {text.shariaBoard}
              </h3>
              <p className="text-sm text-muted-foreground">
                {text.ensuringCompliance}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </CardContent>
        </Card>
        </Link>

        <div>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-xl font-bold font-headline text-foreground">
              {text.featured}
            </h2>
            <Button variant="link" asChild className="text-primary">
              <Link href="/marketplace">{text.seeAll}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {investments.slice(0, 2).map((project) => (
              <InvestmentCard key={project.id} investment={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
