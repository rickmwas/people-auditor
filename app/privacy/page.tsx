import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | People's Auditor",
  description: "Privacy policy compliant with Kenya's Data Protection Act 2019.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="space-y-2 text-center">
        <Shield className="h-12 w-12 text-kenya-green mx-auto" />
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Compliant with Kenya's Data Protection Act, 2019
        </p>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-KE")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            1. Data Controller Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            People's Auditor ("we", "us", "our") is the data controller responsible for your personal data.
          </p>
          <div>
            <p className="font-semibold mb-2">Contact Information:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Email: privacy@peoplesauditor.ke</li>
              <li>Website: peoplesauditor.ke</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            2. Information We Collect
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold mb-2">Personal Data:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>Email addresses</strong> (optional, for newsletter subscriptions)</li>
              <li><strong>IP addresses</strong> (for security and rate limiting)</li>
              <li><strong>File uploads</strong> (evidence submissions, stored securely)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Usage Data:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Page views and navigation patterns (via Umami analytics, privacy-respecting)</li>
              <li>Browser type and device information</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. How We Use Your Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold mb-2">We use your personal data for:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Processing anonymous evidence submissions</li>
              <li>Sending newsletter updates (with your consent)</li>
              <li>Protecting against fraud and abuse (rate limiting)</li>
              <li>Complying with legal obligations</li>
              <li>Improving our services (aggregated, anonymized data only)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Legal Basis for Processing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Under the Data Protection Act, 2019, we process your data based on:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li><strong>Consent:</strong> For newsletter subscriptions</li>
            <li><strong>Legitimate interests:</strong> For security and fraud prevention</li>
            <li><strong>Legal obligation:</strong> For compliance with Kenyan law</li>
            <li><strong>Public interest:</strong> For exposing corruption (anonymous submissions)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Data Sharing and Disclosure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We <strong>do not sell</strong> your personal data. We may share data only:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>With law enforcement if required by Kenyan law</li>
            <li>With service providers (Supabase, Vercel) under strict confidentiality</li>
            <li>When reporting corruption to authorities (anonymous submissions only)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Data Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We implement industry-standard security measures:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Encryption in transit (HTTPS/TLS)</li>
            <li>Encryption at rest for stored files</li>
            <li>Private storage buckets for sensitive data</li>
            <li>Rate limiting to prevent abuse</li>
            <li>Regular security audits</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Your Rights Under Data Protection Act</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong>Access:</strong> Request copies of your personal data</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
            <li><strong>Restriction:</strong> Request limitation of processing</li>
            <li><strong>Objection:</strong> Object to processing of your data</li>
            <li><strong>Data portability:</strong> Receive your data in a portable format</li>
            <li><strong>Withdraw consent:</strong> Withdraw consent at any time</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            To exercise these rights, contact us at: <strong>privacy@peoplesauditor.ke</strong>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Data Retention</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Newsletter data: Until you unsubscribe</li>
            <li>Evidence submissions: 7 years (legal requirement)</li>
            <li>Analytics data: 26 months (anonymized)</li>
            <li>IP addresses: 30 days (for security)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Cookies and Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We use Umami Analytics (self-hosted, privacy-respecting) which:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Does not use cookies</li>
            <li>Does not track individuals</li>
            <li>Respects Do Not Track signals</li>
            <li>Complies with GDPR and Data Protection Act</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>10. Children's Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Our services are not directed to individuals under 18. We do not knowingly collect personal data from children.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>11. Changes to This Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>12. Complaints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you believe we have violated your data protection rights, you can:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Contact us at: <strong>privacy@peoplesauditor.ke</strong></li>
            <li>File a complaint with the <strong>Office of the Data Protection Commissioner</strong></li>
            <li>Contact: dpo@odpc.go.ke or visit odpc.go.ke</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-kenya-green/10 border-kenya-green/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            This privacy policy is compliant with the <strong>Data Protection Act, 2019</strong> of Kenya.
            <br />
            For questions, contact: <strong>privacy@peoplesauditor.ke</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}



