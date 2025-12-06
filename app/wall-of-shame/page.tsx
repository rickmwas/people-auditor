import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, User, MapPin, DollarSign } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall of Shame | People's Auditor",
  description: "Names and faces behind corruption scandals in Kenya.",
};

// Sample data - in production, this would come from the database
const wallOfShame = [
  {
    id: 1,
    name: "Official A",
    position: "Former County Executive",
    county: "Nairobi",
    amount: 2100000000,
    status: "Under Investigation",
    case: "Nairobi Road Fund Scandal",
  },
  {
    id: 2,
    name: "Official B",
    position: "County Health Director",
    county: "Kisumu",
    amount: 850000000,
    status: "Charged",
    case: "Kisumu Health Fund Scandal",
  },
  {
    id: 3,
    name: "Official C",
    position: "Land Commissioner",
    county: "Mombasa",
    amount: 3200000000,
    status: "Under Investigation",
    case: "Mombasa Port Land Grabbing",
  },
];

export default function WallOfShamePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2 text-center">
        <AlertTriangle className="h-12 w-12 text-kenya-red mx-auto" />
        <h1 className="text-4xl font-bold">Wall of Shame</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Those who have been exposed for corruption and financial crimes. Justice demands accountability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallOfShame.map((person) => (
          <Card key={person.id} className="border-kenya-red/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-kenya-red" />
                    {person.name}
                  </CardTitle>
                  <CardDescription>{person.position}</CardDescription>
                </div>
                <Badge
                  variant={
                    person.status === "Charged"
                      ? "destructive"
                      : person.status === "Under Investigation"
                      ? "default"
                      : "secondary"
                  }
                >
                  {person.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {person.county} County
                </p>
              </div>
              <div className="p-3 rounded-md bg-kenya-red/10 border border-kenya-red/30">
                <p className="text-sm text-muted-foreground">Amount Involved</p>
                <p className="text-2xl font-bold text-kenya-red">
                  {formatCurrency(person.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Case</p>
                <p className="text-sm text-muted-foreground">{person.case}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-center text-sm text-muted-foreground">
            <strong>Note:</strong> All information displayed here is based on publicly available data and ongoing investigations. 
            Individuals are innocent until proven guilty in a court of law. This page serves to promote transparency and accountability.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

