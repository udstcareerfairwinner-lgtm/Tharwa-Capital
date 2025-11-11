"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, Users, Shield, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { IslamicPattern } from "@/components/islamic-pattern";
import { Button } from "@/components/ui/button";
import { LanguageTogglePill } from "./language-toggle";

export default function Onboarding() {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const { language, translations: text } = useLanguage();
  const router = useRouter();

  const handleNext = () => {
    if (onboardingStep < screens.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      // In a real app, you might set a cookie or flag in localStorage
      router.push("/dashboard");
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  const screens = [
    {
      icon: <TrendingUp size={80} className="text-primary" />,
      title: text.onboarding1Title,
      desc: text.onboarding1Desc,
    },
    {
      icon: <Users size={80} className="text-accent" />,
      title: text.onboarding2Title,
      desc: text.onboarding2Desc,
    },
    {
      icon: <Shield size={80} className="text-primary" />,
      title: text.onboarding3Title,
      desc: text.onboarding3Desc,
    },
  ];

  const current = screens[onboardingStep];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden" dir={language === "ar" ? "rtl" : "ltr"}>
      <IslamicPattern className="opacity-20" />
      <div className="relative z-10 flex flex-col h-screen">
        <div className="flex justify-between items-center p-4">
            <span className="font-headline text-xl font-bold text-primary">{text.appName}</span>
            <LanguageTogglePill />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="mb-8">{current.icon}</div>
          <h1 className="text-3xl font-bold font-headline text-foreground mb-4">
            {current.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-md">
            {current.desc}
          </p>

          <div className="flex gap-2 mb-12">
            {screens.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === onboardingStep ? "w-8 bg-primary" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-8 space-y-3 border-t bg-background/80 backdrop-blur-sm">
          <Button
            onClick={handleNext}
            className="w-full h-12 text-lg"
            size="lg"
          >
            {onboardingStep < screens.length - 1 ? text.next : text.getStarted}
          </Button>
          {onboardingStep < screens.length - 1 && (
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="w-full h-12 text-lg"
              size="lg"
            >
              {text.skip}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
