'use server';

import {
  filterInvestmentsByShariaCompliance,
  FilterInvestmentsInput,
  InvestmentOpportunity,
} from '@/ai/flows/filter-investments-by-sharia-compliance';
import {
  summarizeShariaComplianceReport,
  SummarizeShariaComplianceReportInput,
} from '@/ai/flows/summarize-sharia-compliance-report';

export async function filterInvestmentsAction(
  input: FilterInvestmentsInput
): Promise<InvestmentOpportunity[]> {
  try {
    const filteredInvestments = await filterInvestmentsByShariaCompliance(
      input
    );
    return filteredInvestments;
  } catch (error) {
    console.error('Error filtering investments:', error);
    // In a real app, you might want to throw the error
    // and handle it in the client-side component.
    return input.investments; // return original list on error
  }
}

export async function summarizeReportAction(
  input: SummarizeShariaComplianceReportInput
): Promise<{ summary?: string; error?: string }> {
  try {
    const result = await summarizeShariaComplianceReport(input);
    return { summary: result.summary };
  } catch (error) {
    console.error('Error summarizing report:', error);
    return { error: 'Could not generate summary.' };
  }
}
