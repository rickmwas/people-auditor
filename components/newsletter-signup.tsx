"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSignup() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
        setName("");
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="bg-kenya-green/10 border-kenya-green/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <CheckCircle2 className="h-8 w-8 text-kenya-green mx-auto" />
            <p className="font-semibold">Successfully Subscribed!</p>
            <p className="text-sm text-muted-foreground">
              Check your email to confirm your subscription.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Stay Informed
        </CardTitle>
        <CardDescription>
          Get weekly updates on corruption exposés, county budgets, and financial transparency.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newsletter-name">Name (Optional)</Label>
            <Input
              id="newsletter-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newsletter-email">Email</Label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

