"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Project title must be at least 5 characters.",
  }),
  category: z.string({
    required_error: "Please select a project category.",
  }),
  fundingGoal: z.coerce.number().min(1000, {
    message: "Funding goal must be at least 1,000 QAR.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
});

export function NewProjectForm() {
    const { translations: text } = useLanguage();
    const { toast } = useToast();

    const categories = [
        text.realEstate,
        text.renewable,
        text.business,
        text.agriculture,
        text.technology,
      ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      fundingGoal: 1000,
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: "Project Submitted!",
        description: "Your project has been submitted for review. (This is a simulation)",
    })
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{text.proposeInvestmentOpportunity}</CardTitle>
        <CardDescription>{text.proposeInvestmentOpportunityDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.projectTitle}</FormLabel>
                  <FormControl>
                    <Input placeholder={text.projectTitleExample} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{text.category}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={text.selectCategory} />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="fundingGoal"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{text.fundingGoalQAR}</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="50000" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.projectDescription}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={text.projectDescriptionPlaceholder}
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
                <FormLabel>{text.projectImage}</FormLabel>
                <FormControl>
                    <Button variant="outline" className="w-full justify-start font-normal text-muted-foreground" type="button">
                        <Upload className="mr-2" />
                        {text.projectImageUpload}
                    </Button>
                </FormControl>
                <FormDescription>
                    {text.projectImageDesc}
                </FormDescription>
            </FormItem>

            <Button type="submit" size="lg" className="w-full">{text.submitForReview}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
