
"use client";

import { shariaBoard } from "@/lib/data";
import { useLanguage } from "@/hooks/use-language";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { IslamicPattern } from "@/components/islamic-pattern";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ShariaBoardMemberPage() {
  const params = useParams();
  const { language, translations: text, isRTL } = useLanguage();
  const member = shariaBoard.find((m) => m.id === params.id);
  
  if (!member) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <header className="relative h-52 bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-primary-foreground p-6 overflow-hidden">
        <IslamicPattern className="opacity-10" />
        <div className="relative z-10 text-center">
            <Image
              src={member.image}
              alt={member.name[language]}
              width={128}
              height={128}
              className="rounded-full border-4 border-white/50 shadow-lg mx-auto"
              data-ai-hint={member.imageHint}
            />
        </div>
      </header>

      <div className="p-4 md:p-6 -mt-16">
        <Card className="relative z-20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold font-headline text-foreground">{member.name[language]}</h1>
              <p className="text-lg text-primary font-medium mt-1">{member.role[language]}</p>
              <div className="flex justify-center gap-2 mt-3 flex-wrap">
                {member.expertise.map((item, index) => (
                    <Badge key={index} variant="secondary">{item[language]}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 prose prose-lg max-w-none text-muted-foreground">
                <p>{member.bio[language]}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
