import Link from "next/link";
import { Shield, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-kenya-red" />
              <span className="text-xl font-bold">People's Auditor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Kenya's public finance watchdog. Holding the powerful accountable.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/national" className="text-muted-foreground hover:text-foreground">
                  National Budget
                </Link>
              </li>
              <li>
                <Link href="/counties" className="text-muted-foreground hover:text-foreground">
                  Counties
                </Link>
              </li>
              <li>
                <Link href="/exposes" className="text-muted-foreground hover:text-foreground">
                  Exposés
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-foreground">
                  Learn
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-foreground">
                  Submit Evidence
                </Link>
              </li>
              <li>
                <Link href="/wall-of-shame" className="text-muted-foreground hover:text-foreground">
                  Wall of Shame
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@peoplesauditor.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
            </div>
            <div className="text-center">
              <p>&copy; {new Date().getFullYear()} People's Auditor. All rights reserved.</p>
              <p className="mt-2">Built for transparency. Built for Kenya.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

