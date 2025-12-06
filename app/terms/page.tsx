import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | People's Auditor",
  description: "Terms of service for People's Auditor platform.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="space-y-2 text-center">
        <Scale className="h-12 w-12 text-kenya-red mx-auto" />
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-KE")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Acceptance of Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            By accessing and using People's Auditor ("the Platform"), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use the Platform.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Description of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            People's Auditor is a platform that:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Tracks public finance data in Kenya</li>
            <li>Provides information on county budgets and national debt</li>
            <li>Publishes investigative reports on corruption</li>
            <li>Allows anonymous submission of evidence</li>
            <li>Provides civic education resources</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. User Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground font-semibold">You agree to:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Provide accurate and truthful information</li>
            <li>Respect intellectual property rights</li>
            <li>Not use the Platform for illegal purposes</li>
            <li>Not submit false or defamatory evidence</li>
            <li>Not attempt to harm or disrupt the Platform</li>
            <li>Respect the privacy and rights of others</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Anonymous Submissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When submitting evidence anonymously:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>You warrant that all information provided is accurate to the best of your knowledge</li>
            <li>You understand that false submissions may have legal consequences</li>
            <li>You grant us permission to review, verify, and potentially publish your submission (anonymously)</li>
            <li>You understand we cannot guarantee anonymity if required by law</li>
            <li>File uploads are limited to 15MB per file, 10 files per submission</li>
            <li>Rate limits apply: 5 submissions per hour per IP address</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Intellectual Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            All content on the Platform, unless otherwise stated, is owned by People's Auditor or its content creators. You may:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Share links to our content</li>
            <li>Use content for personal, non-commercial purposes</li>
            <li>Quote content with proper attribution</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            You may NOT:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Republish our content without permission</li>
            <li>Use our content for commercial purposes</li>
            <li>Modify or create derivative works without permission</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-kenya-red" />
            6. Disclaimers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>The Platform is provided "as is" without warranties:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>We do not guarantee the accuracy of all data (we use official sources where possible)</li>
            <li>We are not responsible for actions taken based on our content</li>
            <li>We do not provide legal, financial, or professional advice</li>
            <li>The Platform may experience downtime or errors</li>
            <li>We reserve the right to modify or discontinue features</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Limitation of Liability</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            To the maximum extent permitted by Kenyan law, People's Auditor shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Indemnification</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You agree to indemnify and hold harmless People's Auditor from any claims, damages, or expenses arising from your use of the Platform or violation of these Terms.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Modifications to Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            We reserve the right to modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance. We will notify users of significant changes.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>10. Termination</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We reserve the right to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Suspend or terminate access for violations</li>
            <li>Remove content that violates these Terms</li>
            <li>Block IP addresses engaged in abuse</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>11. Governing Law</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            These Terms are governed by the laws of Kenya. Any disputes shall be resolved in Kenyan courts.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>12. Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            For questions about these Terms, contact: <strong>legal@peoplesauditor.ke</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}



