import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Evidence | People's Auditor",
  description: "Submit corruption evidence anonymously. Your identity will be protected.",
};

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

