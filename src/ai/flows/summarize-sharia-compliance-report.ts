'use server';

/**
 * @fileOverview A flow to summarize Sharia compliance reports for investment opportunities.
 *
 * - summarizeShariaComplianceReport - A function that summarizes a given Sharia compliance report.
 * - SummarizeShariaComplianceReportInput - The input type for the summarizeShariaComplianceReport function.
 * - SummarizeShariaComplianceReportOutput - The return type for the summarizeShariaComplianceReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeShariaComplianceReportInputSchema = z.object({
  reportText: z
    .string()
    .describe('The text of the Sharia compliance report to summarize.'),
});
export type SummarizeShariaComplianceReportInput = z.infer<
  typeof SummarizeShariaComplianceReportInputSchema
>;

const SummarizeShariaComplianceReportOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the Sharia compliance report.'),
});
export type SummarizeShariaComplianceReportOutput = z.infer<
  typeof SummarizeShariaComplianceReportOutputSchema
>;

export async function summarizeShariaComplianceReport(
  input: SummarizeShariaComplianceReportInput
): Promise<SummarizeShariaComplianceReportOutput> {
  return summarizeShariaComplianceReportFlow(input);
}

const summarizeShariaComplianceReportPrompt = ai.definePrompt({
  name: 'summarizeShariaComplianceReportPrompt',
  input: {schema: SummarizeShariaComplianceReportInputSchema},
  output: {schema: SummarizeShariaComplianceReportOutputSchema},
  prompt: `You are an expert in Sharia compliance for financial investments.
  Your task is to summarize the following Sharia compliance report, highlighting the key points relevant to an investor.
  Ensure the summary is concise and easy to understand.

  Report:
  {{reportText}}`,
});

const summarizeShariaComplianceReportFlow = ai.defineFlow(
  {
    name: 'summarizeShariaComplianceReportFlow',
    inputSchema: SummarizeShariaComplianceReportInputSchema,
    outputSchema: SummarizeShariaComplianceReportOutputSchema,
  },
  async input => {
    const {output} = await summarizeShariaComplianceReportPrompt(input);
    return output!;
  }
);
