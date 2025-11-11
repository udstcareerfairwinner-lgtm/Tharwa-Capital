import { investments } from "@/lib/data";
import { translations } from "@/lib/translations";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  Calendar,
  TrendingUp,
  Target,
  PiggyBank,
} from "lucide-react";
import { IslamicPattern } from "@/components/islamic-pattern";
import { ShariaReportSummarizer } from "@/components/sharia-report-summarizer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { InvestmentConfirmation } from "@/components/investment-confirmation";

type Props = {
  params: { id: string };
};

export default function InvestmentDetailPage({ params }: Props) {
  const investment = investments.find((inv) => inv.id.toString() === params.id);
  
  if (!investment) {
    notFound();
  }

  const lang = "en"; // Defaulting to English for this server component
  const text = translations[lang];
  const progress = (investment.invested / investment.goal) * 100;
  const imageHint = PlaceHolderImages.find(img => img.imageUrl === investment.image)?.imageHint || 'investment opportunity';


  return (
    <div className="bg-background">
      <div className="relative h-60">
        <Image
          src={investment.image}
          alt={investment.title[lang]}
          fill
          className="object-cover"
          data-ai-hint={imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
            <Badge className="bg-background text-foreground mb-2">{investment.category[lang]}</Badge>
            <h1 className="text-3xl font-bold font-headline text-white shadow-lg">
                {investment.title[lang]}
            </h1>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        <Card>
            <CardContent className="p-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>
                    {text.invested}{" "}
                    <strong className="text-foreground">
                        {investment.invested.toLocaleString()} QAR
                    </strong>
                    </span>
                    <span>
                    {text.of} {investment.goal.toLocaleString()} QAR
                    </span>
                </div>
                <Progress value={progress} className="h-3" />
            </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Card>
                <CardHeader>
                    <TrendingUp className="mx-auto text-primary"/>
                    <CardTitle className="text-lg">{investment.return}</CardTitle>
                    <CardDescription>{text.expectedReturn}</CardDescription>
                </CardHeader>
            </Card>
             <Card>
                <CardHeader>
                    <PiggyBank className="mx-auto text-accent"/>
                    <CardTitle className="text-lg">{investment.minInvest}</CardTitle>
                    <CardDescription>{text.minInvestment}</CardDescription>
                </CardHeader>
            </Card>
             <Card>
                <CardHeader>
                    <Users className="mx-auto text-blue-500"/>
                    <CardTitle className="text-lg">{investment.investors}</CardTitle>
                    <CardDescription>{text.investors}</CardDescription>
                </CardHeader>
            </Card>
             <Card>
                <CardHeader>
                    <Calendar className="mx-auto text-red-500"/>
                    <CardTitle className="text-lg">{investment.daysLeft}</CardTitle>
                    <CardDescription>{text.daysLeft}</CardDescription>
                </CardHeader>
            </Card>
        </div>

        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-transparent">
             <IslamicPattern className="opacity-5"/>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    {investment.sharia ? <ShieldCheck className="text-primary"/> : <ShieldAlert className="text-destructive"/>}
                    {text.shariaCompliance}
                </CardTitle>
                 <Badge variant={investment.sharia ? 'default' : 'destructive'} className="w-fit">
                    {investment.sharia ? text.shariaApproved : text.nonCompliant}
                </Badge>
            </CardHeader>
            <CardContent>
                <ShariaReportSummarizer report={investment.shariaComplianceReport} />
            </CardContent>
        </Card>

        <InvestmentConfirmation investment={investment} />

      </div>
    </div>
  );
}
