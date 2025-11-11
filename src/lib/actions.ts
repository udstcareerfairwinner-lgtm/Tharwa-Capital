"use server";

import {
  filterInvestmentsByShariaCompliance,
  FilterInvestmentsInput,
  InvestmentOpportunity,
} from "@/ai/flows/filter-investments-by-sharia-compliance";
import {
  summarizeShariaComplianceReport,
  SummarizeShariaComplianceReportInput,
} from "@/ai/flows/summarize-sharia-compliance-report";

export async function filterInvestmentsAction(
  input: FilterInvestmentsInput
): Promise<InvestmentOpportunity[]> {
  try {
    const filteredInvestments = await filterInvestmentsByShariaCompliance(input);
    return filteredInvestments;
  } catch (error) {
    console.error("Error filtering investments:", error);
    return [];
  }
}

export async function summarizeReportAction(
  input: SummarizeShariaComplianceReportInput
): Promise<string> {
  try {
    const result = await summarizeShariaComplianceReport(input);
    return result.summary;
  } catch (error) {
    console.error("Error summarizing report:", error);
    return "Error: Could not generate summary.";
  }
}
