'use server';

/**
 * @fileOverview A flow to filter investment opportunities based on Sharia compliance certifications.
 *
 * - filterInvestmentsByShariaCompliance - A function that filters investment opportunities.
 * - FilterInvestmentsInput - The input type for the filterInvestmentsByShariaCompliance function.
 * - FilterInvestmentsOutput - The return type for the filterInvestmentsByShariaCompliance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { summarizeShariaComplianceReport } from './summarize-sharia-compliance-report';

const InvestmentOpportunitySchema = z.object({
  id: z.number(),
  title: z.string(),
  category: z.string(),
  image: z.string(),
  invested: z.number(),
  goal: z.number(),
  investors: z.number(),
  return: z.string(),
  minInvest: z.string(),
  daysLeft: z.number(),
  shariaComplianceReport: z.string().optional(), // Added shariaComplianceReport
  sharia: z.boolean(),
});

export type InvestmentOpportunity = z.infer<typeof InvestmentOpportunitySchema>;

const FilterInvestmentsInputSchema = z.object({
  investments: z.array(InvestmentOpportunitySchema),
  shariaCompliantOnly: z.boolean().describe('Whether to filter for only Sharia-compliant investments.'),
});

export type FilterInvestmentsInput = z.infer<typeof FilterInvestmentsInputSchema>;

const FilterInvestmentsOutputSchema = z.array(InvestmentOpportunitySchema);

export type FilterInvestmentsOutput = z.infer<typeof FilterInvestmentsOutputSchema>;

export async function filterInvestmentsByShariaCompliance(
  input: FilterInvestmentsInput
): Promise<FilterInvestmentsOutput> {
  return filterInvestmentsFlow(input);
}

const reviewComplianceReport = ai.defineTool({
  name: 'reviewComplianceReport',
  description: 'Reviews a Sharia compliance report and returns whether the investment is Sharia-compliant.',
  inputSchema: z.object({
    report: z.string().describe('The Sharia compliance report to review.'),
  }),
  outputSchema: z.boolean().describe('Whether the investment is Sharia-compliant according to the report.'),
},
async (input) => {
  const { summary } = await summarizeShariaComplianceReport({ reportText: input.report });
  // A simple check based on keywords in the summary.
  // This can be improved with a more sophisticated LLM call.
  const isCompliant = !summary.toLowerCase().includes('not compliant') && !summary.toLowerCase().includes('under review');
  return isCompliant;
}
);

const filterInvestmentsPrompt = ai.definePrompt({
  name: 'filterInvestmentsPrompt',
  tools: [reviewComplianceReport],
  input: {schema: FilterInvestmentsInputSchema},
  output: {schema: FilterInvestmentsOutputSchema},
  prompt: `You are an expert in filtering investment opportunities based on Sharia compliance.

You are given a list of investment opportunities and a flag indicating whether to filter for only Sharia-compliant investments.

If the flag is true, you should:
1.  For each investment opportunity that has a shariaComplianceReport, use the reviewComplianceReport tool to determine if it is Sharia-compliant. If report is not available, assume investment is compliant if sharia field is true.
2.  Return only the Sharia-compliant investment opportunities.

If the flag is false, return all investment opportunities.

Here are the investment opportunities:
{{#each investments}}
  - Title: {{this.title}}, Category: {{this.category}}, Sharia: {{this.sharia}}, Compliance Report: {{this.shariaComplianceReport}}
{{/each}}

Sharia Compliant Only: {{shariaCompliantOnly}}

Output: An array of investment opportunities that meet the criteria.
`,
});

const filterInvestmentsFlow = ai.defineFlow(
  {
    name: 'filterInvestmentsFlow',
    inputSchema: FilterInvestmentsInputSchema,
    outputSchema: FilterInvestmentsOutputSchema,
  },
  async input => {
    if (!input.shariaCompliantOnly) {
      return input.investments;
    }

    const compliantInvestments: InvestmentOpportunity[] = [];

    for (const investment of input.investments) {
      if (investment.shariaComplianceReport) {
        //Using the tool to determine Sharia compliance
        const isCompliant = await reviewComplianceReport({report: investment.shariaComplianceReport});
        if (isCompliant) {
          compliantInvestments.push(investment);
        }
      } else if (investment.sharia) {
        // If no report, and sharia is true, assume compliant.
        compliantInvestments.push(investment);
      }
    }

    //Returning the filtered list of compliant investments
    return compliantInvestments;
  }
);
