
"use client";

import { useState, useEffect, useMemo, ReactNode } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Investment } from "@/lib/data";
import { InvestmentCard } from "./investment-card";
import { Input } from "./ui/input";
import { Search, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { filterInvestmentsAction } from "@/lib/actions";
import { Skeleton } from "./ui/skeleton";
import type { InvestmentOpportunity } from "@/ai/flows/filter-investments-by-sharia-compliance";

interface MarketplaceClientProps {
  initialInvestments: Investment[];
  categories: { icon: ReactNode; label: string }[];
}

export function MarketplaceClient({ initialInvestments, categories: serverCategories }: MarketplaceClientProps) {
  const { language, translations: text, isRTL } = useLanguage();
  const [displayedInvestments, setDisplayedInvestments] = useState<Investment[]>(initialInvestments);
  const [shariaOnly, setShariaOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleShariaToggle = async (checked: boolean) => {
    setShariaOnly(checked);
    setIsLoading(true);

    const formattedInvestments: InvestmentOpportunity[] = initialInvestments.map(inv => ({
      ...inv,
      title: inv.title[language],
      category: inv.category[language],
      shariaComplianceReport: inv.shariaComplianceReport ? inv.shariaComplianceReport[language] : undefined,
    }));

    try {
      const filtered = await filterInvestmentsAction({
        investments: formattedInvestments,
        shariaCompliantOnly: checked,
      });

      const originalFiltered = initialInvestments.filter(original => 
        filtered.some(f => f.id === original.id)
      );
      setDisplayedInvestments(originalFiltered);

    } catch (error) {
      console.error("Failed to filter investments", error);
      // Optionally show a toast notification
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    handleShariaToggle(shariaOnly);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialInvestments, language]);

  const filteredInvestments = useMemo(() => {
    return displayedInvestments.filter(investment => {
        const title = investment.title[language].toLowerCase();
        const category = investment.category[language];
        
        const matchesSearch = title.includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
  }, [displayedInvestments, searchQuery, selectedCategory, language]);

  // Translate category labels for display
  const categories = useMemo(() => [
    {icon: serverCategories[0].icon, label: text.realEstate},
    {icon: serverCategories[1].icon, label: text.renewable},
    {icon: serverCategories[2].icon, label: text.business},
    {icon: serverCategories[3].icon, label: text.agriculture},
    {icon: serverCategories[4].icon, label: text.technology},
  ], [text, serverCategories]);


  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <div className="bg-background border-b p-4 md:p-6 sticky top-0 z-40">
        <h1 className="text-3xl font-bold font-headline text-foreground mb-4">
          {text.marketplace}
        </h1>
        <div className="relative">
          <Search
            className="absolute top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
            style={{ [isRTL ? "right" : "left"]: "12px" }}
          />
          <Input
            type="text"
            placeholder={text.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-muted border-none rounded-xl py-3 ${
              isRTL ? "pr-10" : "pl-10"
            } text-foreground placeholder-muted-foreground`}
          />
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold font-headline text-foreground mb-3">{text.categories}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
             {categories.map((cat, idx) => (
                <Card 
                    key={idx} 
                    onClick={() => setSelectedCategory(selectedCategory === cat.label ? null : cat.label)}
                    className={`p-3 cursor-pointer transition-all ${selectedCategory === cat.label ? 'bg-primary/20 border-primary' : 'bg-card hover:border-primary/50'}`}
                >
                    <CardContent className="flex flex-col items-center justify-center p-0 gap-2">
                        {cat.icon}
                        <p className="text-sm font-semibold text-center">{cat.label}</p>
                    </CardContent>
                </Card>
             ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
            <Label htmlFor="sharia-filter" className="font-semibold">
                {text.shariaCompliantOnly}
            </Label>
            <Switch
                id="sharia-filter"
                checked={shariaOnly}
                onCheckedChange={handleShariaToggle}
            />
        </div>

        <div>
            <h2 className="text-lg font-bold font-headline text-foreground mb-3">{text.allOpportunities}</h2>
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <Skeleton className="h-40 w-full" />
                            <div className="p-4 space-y-3">
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredInvestments.map((investment) => (
                        <InvestmentCard key={investment.id} investment={investment} />
                    ))}
                </div>
            )}
            {!isLoading && filteredInvestments.length === 0 && (
                <Card className="flex items-center justify-center p-10">
                    <p className="text-muted-foreground">No investments found matching your criteria.</p>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
