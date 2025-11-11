import { MarketplaceClient } from "@/components/marketplace-client";
import { translations } from "@/lib/translations";
import { investments } from "@/lib/data";
import {
  Building,
  Zap,
  Store,
  Wheat,
  Cpu,
} from "lucide-react";

export default function MarketplacePage() {
  // We can pass the initial data from the server to the client component.
  // This allows for fast initial load and SEO, while client can handle filtering.
  
  const text = translations["en"]; // for server-side rendering of categories

  const categories = [
    {
      icon: <Building size={24} className="text-primary" />,
      label: text.realEstate,
    },
    {
      icon: <Zap size={24} className="text-accent" />,
      label: text.renewable,
    },
    {
      icon: <Store size={24} className="text-blue-500" />,
      label: text.business,
    },
    {
      icon: <Wheat size={24} className="text-green-500" />,
      label: text.agriculture,
    },
    {
      icon: <Cpu size={24} className="text-purple-500" />,
      label: text.technology,
    },
  ];

  return <MarketplaceClient initialInvestments={investments} categories={categories} />;
}
