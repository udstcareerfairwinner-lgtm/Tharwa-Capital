"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Investment } from "@/lib/data";
import { CheckCircle, ExternalLink } from "lucide-react";

interface InvestmentConfirmationProps {
  investment: Investment;
}

export function InvestmentConfirmation({
  investment,
}: InvestmentConfirmationProps) {
  const { language, translations: text } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after a short delay to allow for fade-out animation
    setTimeout(() => {
      setIsConfirmed(false);
    }, 300);
  };
  
  if (!investment.sharia) {
    return (
        <Button size="lg" className="w-full h-12 text-lg" disabled>
            {text.underReview}
        </Button>
    )
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button size="lg" className="w-full h-12 text-lg">
          {text.investNow}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {!isConfirmed ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {text.confirmInvestment}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p>{text.confirmInvestmentDesc.replace('{title}', investment.title[language])}</p>
                <ul className="mt-4 list-disc list-inside text-sm text-muted-foreground space-y-2">
                    <li>{text.nextStep1}</li>
                    <li>{text.nextStep2}</li>
                    <li>{text.nextStep3}</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleClose}>{text.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>{text.proceedToPayment}</AlertDialogAction>
            </AlertDialogFooter>
          </>
        ) : (
          <>
             <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <CheckCircle className="text-green-500" />
                {text.paymentRedirectTitle}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {text.paymentRedirectDesc}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={handleClose} variant="outline">{text.close}</Button>
              <Button asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    {text.openPaymentGateway} <ExternalLink className="ml-2"/>
                </a>
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
