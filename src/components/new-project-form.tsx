
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
        <CardTitle className="font-headline">Propose an Investment Opportunity</CardTitle>
        <CardDescription>Fill out the details below to submit your project for review by our team and Sharia board.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Eco-Friendly Packaging Solutions" {...field} />
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
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a project category" />
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
                    <FormLabel>Funding Goal (QAR)</FormLabel>
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
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project, its mission, and its potential impact."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
                <FormLabel>Project Image</FormLabel>
                <FormControl>
                    <Button variant="outline" className="w-full justify-start font-normal text-muted-foreground" type="button">
                        <Upload className="mr-2" />
                        Upload an image (simulation)
                    </Button>
                </FormControl>
                <FormDescription>
                    Upload a high-quality image that represents your project.
                </FormDescription>
            </FormItem>

            <Button type="submit" size="lg" className="w-full">Submit for Review</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
