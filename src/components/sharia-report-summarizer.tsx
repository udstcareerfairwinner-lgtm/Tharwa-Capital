
"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Sparkles, FileText } from "lucide-react";
import { summarizeReportAction } from "@/lib/actions";
import { Skeleton } from "./ui/skeleton";

interface ShariaReportSummarizerProps {
  report: Record<string, string> | undefined;
}

export function ShariaReportSummarizer({ report }: ShariaReportSummarizerProps) {
  const { language, translations: text } = useLanguage();
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary("");
    setError("");

    const reportText = report?.['en'];

    if (!reportText) {
      setError("Compliance report is not available for this project.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await summarizeReportAction({ reportText });
      if (result.error) {
        setError(result.error);
      } else if (result.summary) {
        setSummary(result.summary);
      } else {
        setError("Failed to get a summary.");
      }
    } catch (e) {
      setError("An unexpected error occurred while generating the summary.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const hasReport = report && Object.values(report).some(r => r && r.length > 0);
  const reportTextForDisplay = report?.[language] || report?.['en'];

  return (
    <div className="space-y-4">
       {!hasReport ? (
        <p className="text-muted-foreground italic">No detailed compliance report available for this project.</p>
       ) : (
        <>
            {reportTextForDisplay && (
                <Card className="bg-background/50">
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                    <FileText size={16} />
                    Full Report
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                    {reportTextForDisplay}
                    </p>
                </CardContent>
                </Card>
            )}

            <Button onClick={handleSummarize} disabled={isLoading} className="w-full gap-2">
                <Sparkles size={16} />
                {isLoading ? text.generatingSummary : text.summarizeWithAI}
            </Button>
        </>
       )}

      {isLoading && (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 font-headline">
                    <Sparkles size={16} className="text-accent animate-pulse"/>
                    {text.summary}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </CardContent>
        </Card>
      )}

      {summary && !isLoading && (
        <Card className="border-accent">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 font-headline">
                <Sparkles size={16} className="text-accent"/>
                {text.summary}
            </CardTitle>
          </Header>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{summary}</p>
          </CardContent>
        </Card>
      )}

      {error && <p className="text-sm text-destructive text-center mt-2">{error}</p>}
    </div>
  );
}
