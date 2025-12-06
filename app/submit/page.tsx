"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, Image, Shield } from "lucide-react";

export default function SubmitPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    county: "",
    category: "",
    email: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
  const MAX_FILES = 10;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Validate file sizes
      const validFiles: File[] = [];
      const errors: string[] = [];
      
      newFiles.forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
          errors.push(`${file.name} exceeds 15MB limit`);
        } else if (files.length + validFiles.length >= MAX_FILES) {
          errors.push(`Maximum ${MAX_FILES} files allowed`);
        } else {
          validFiles.push(file);
        }
      });
      
      if (errors.length > 0) {
        toast({
          title: "File Error",
          description: errors.join(", "),
          variant: "destructive",
        });
      }
      
      if (validFiles.length > 0) {
        setFiles((prev) => [...prev, ...validFiles]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      if (formData.county) formDataToSend.append("county", formData.county);
      if (formData.category) formDataToSend.append("category", formData.category);
      if (formData.email) formDataToSend.append("email", formData.email);
      
      // Add files
      files.forEach((file) => {
        formDataToSend.append("files", file);
      });

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Submission failed");
      }

      toast({
        title: "Evidence Submitted",
        description: data.message || "Your evidence has been received anonymously. We will review it and may follow up if needed.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        county: "",
        category: "",
        email: "",
      });
      setFiles([]);
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
      <div className="space-y-2 text-center">
        <Shield className="h-12 w-12 text-kenya-red mx-auto" />
        <h1 className="text-4xl font-bold">Submit Evidence Anonymously</h1>
        <p className="text-muted-foreground">
          Share corruption evidence securely. Your identity will be protected.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evidence Submission Form</CardTitle>
          <CardDescription>
            All submissions are anonymous. Only provide an email if you want updates on your submission.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title / Brief Description</Label>
              <Input
                id="title"
                placeholder="e.g., Missing funds in County X"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <textarea
                id="description"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Provide as much detail as possible about the corruption or financial crime..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="county">County (if applicable)</Label>
                <Input
                  id="county"
                  placeholder="e.g., Nairobi"
                  value={formData.county}
                  onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  <option value="Misappropriation">Misappropriation</option>
                  <option value="Procurement Fraud">Procurement Fraud</option>
                  <option value="Land Grabbing">Land Grabbing</option>
                  <option value="Infrastructure Fraud">Infrastructure Fraud</option>
                  <option value="Social Program Fraud">Social Program Fraud</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional - for updates only)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Your email will be encrypted and only used to send updates about this submission.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Upload Evidence (Photos, Documents, etc.)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6">
                <input
                  type="file"
                  id="files"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="files"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Images, PDFs, Word documents (Max 15MB per file, up to 10 files)
                  </span>
                </label>
              </div>
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        {file.type.startsWith("image/") ? (
                          <Image className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Evidence Anonymously"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-kenya-green/10 border-kenya-green/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Your Privacy is Protected</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• All submissions are encrypted</li>
            <li>• Your identity remains anonymous</li>
            <li>• We never share your personal information</li>
            <li>• Evidence is securely stored and reviewed</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

