
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

  const handleSummarize = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    setSummary("");
    setError("");

    try {
      const reportText = report?.['en'];

      if (!reportText) {
        setError("Compliance report is not available for summarization.");
        return;
      }
      
      const result = await summarizeReportAction({ reportText });

      if (result.error) {
        setError(result.error);
      } else if (result.summary) {
        setSummary(result.summary);
      } else {
        setError("Failed to get a summary.");
      }
    } catch (e) {
      console.error("An unexpected error occurred:", e);
      setError("An unexpected error occurred while generating the summary.");
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
        </>
      )}

      {hasReport && (
        <div className="relative z-10">
          <Button 
            onClick={handleSummarize} 
            disabled={isLoading} 
            className="w-full gap-2 cursor-pointer"
            type="button"
          >
            <Sparkles size={16} />
            {isLoading ? text.generatingSummary : text.summarizeWithAI}
          </Button>
        </div>
      )}

      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 font-headline">
              <Sparkles size={16} className="text-accent animate-pulse"/>
              {text.summary}
            </CardTitle>
          </Header>
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
