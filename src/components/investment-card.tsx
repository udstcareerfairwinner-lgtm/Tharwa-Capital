"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";
import { Investment } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, Users, Calendar, TrendingUp } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface InvestmentCardProps {
  investment: Investment;
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  const { language, translations: text } = useLanguage();
  const progress = (investment.invested / investment.goal) * 100;

  const imageHint = PlaceHolderImages.find(img => img.imageUrl === investment.image)?.imageHint || 'investment opportunity';

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/marketplace/${investment.id}`} className="block">
          <div className="relative">
            <Image
              src={investment.image}
              alt={investment.title[language]}
              width={400}
              height={200}
              className="w-full h-40 object-cover"
              data-ai-hint={imageHint}
            />
            {investment.sharia && (
              <Badge
                variant="default"
                className="absolute top-2 right-2 bg-primary/80 text-primary-foreground backdrop-blur-sm"
              >
                <ShieldCheck className="w-3 h-3 mr-1" />
                {text.shariaApproved}
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              {investment.category[language]}
            </p>
            <h3 className="font-bold font-headline text-lg text-foreground mb-2 truncate">
              {investment.title[language]}
            </h3>

            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>
                  {text.invested}:{" "}
                  <span className="font-semibold text-foreground">
                    {investment.invested.toLocaleString()} QAR
                  </span>
                </span>
                <span className="font-semibold text-primary">{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
              <div>
                  <p className="text-xs text-muted-foreground">{text.expectedReturn}</p>
                  <p className="font-semibold text-primary flex items-center justify-center gap-1"><TrendingUp size={14}/> {investment.return}</p>
              </div>
              <div>
                  <p className="text-xs text-muted-foreground">{text.investors}</p>
                  <p className="font-semibold text-foreground flex items-center justify-center gap-1"><Users size={14}/> {investment.investors}</p>
              </div>
              <div>
                  <p className="text-xs text-muted-foreground">{text.daysLeft}</p>
                  <p className="font-semibold text-foreground flex items-center justify-center gap-1"><Calendar size={14}/> {investment.daysLeft}</p>
              </div>
            </div>
             <Button className="w-full" variant="outline">
              {text.viewProject}
            </Button>
          </CardContent>
      </Link>
    </Card>
  );
}
