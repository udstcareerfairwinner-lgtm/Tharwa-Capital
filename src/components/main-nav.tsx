
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, Users, User, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();
  const { translations: text, isRTL } = useLanguage();

  const navItems = [
    { href: "/dashboard", label: text.dashboard, icon: Home },
    { href: "/marketplace", label: text.marketplace, icon: BarChart3 },
    { href: "/community", label: text.community, icon: Users },
    { href: "/profile", label: text.profile, icon: User },
  ];

  const NavLink = ({
    href,
    label,
    icon: Icon,
  }: {
    href: string;
    label: string;
    icon: React.ElementType;
  }) => {
    const isActive = pathname.startsWith(href);
    return (
      <Link href={href} className={cn(
        "flex flex-col items-center justify-center gap-1 transition-colors w-16",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}>
        <Icon size={24} />
        <span className="text-xs font-medium">{label}</span>
      </Link>
    );
  };
  
  const navLinks = navItems.map(item => <NavLink key={item.href} {...item} />);
  // Insert placeholder for the Plus button
  navLinks.splice(2, 0, 
    <Link href="/marketplace" key="plus-button" className="flex flex-col items-center gap-1">
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-green-400 rounded-full flex items-center justify-center -mt-8 shadow-lg shadow-primary/30 cursor-pointer">
            <Plus size={32} className="text-primary-foreground" />
        </div>
    </Link>
  );


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto h-20 px-2">
        {navLinks}
      </div>
    </div>
  );
}
