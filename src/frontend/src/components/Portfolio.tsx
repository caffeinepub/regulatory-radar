import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const markets = ["USA", "EU", "China", "UK", "APAC", "Global"];
const productCategories = [
  "Skincare",
  "Haircare",
  "Color Cosmetics",
  "Fragrances",
  "Industrial Cleaners",
  "Solvents",
  "Coatings",
];

const outputRegulations = [
  {
    title: "OSHA HCS Update",
    region: "USA",
    risk: "high",
    affected: "Industrial Cleaners, Coatings",
    deadline: "May 2025",
    action: "Update SDS documents immediately",
  },
  {
    title: "EU CLP Reclassification",
    region: "EU",
    risk: "medium",
    affected: "Skincare Ingredients",
    deadline: "Q3 2025",
    action: "Safety assessment required",
  },
  {
    title: "PFAS Restrictions",
    region: "Global",
    risk: "high",
    affected: "Coatings, Industrial Products",
    deadline: "Q4 2025",
    action: "Reformulation required",
  },
  {
    title: "China NMPA Cosmetics",
    region: "China",
    risk: "high",
    affected: "Skincare, Color Cosmetics",
    deadline: "Jun 2025",
    action: "NMPA registration required",
  },
  {
    title: "EU Microplastics Ban",
    region: "EU",
    risk: "medium",
    affected: "Skincare, Haircare",
    deadline: "Jun 2026",
    action: "Formulation audit needed",
  },
];

const riskPill: Record<string, string> = {
  high: "bg-risk-high text-red-300 border text-xs",
  medium: "bg-risk-medium text-amber-300 border text-xs",
  low: "bg-risk-low text-green-300 border text-xs",
};
const riskDot: Record<string, string> = {
  high: "oklch(0.62 0.22 25)",
  medium: "oklch(0.78 0.18 65)",
  low: "oklch(0.68 0.18 145)",
};

export function Portfolio() {
  const [industry, setIndustry] = useState("");
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([
    "USA",
    "EU",
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showOutput, setShowOutput] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleMarket = (m: string) =>
    setSelectedMarkets((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    );
  const toggleCategory = (c: string) =>
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowOutput(true);
    }, 1200);
  };

  const filteredRegs = outputRegulations.filter(
    (r) =>
      selectedMarkets.some((m) => r.region === m || r.region === "Global") ||
      selectedMarkets.includes("Global"),
  );
  const highCount = filteredRegs.filter((r) => r.risk === "high").length;
  const medCount = filteredRegs.filter((r) => r.risk === "medium").length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Portfolio Impact Analyzer
        </h2>
        <p className="text-sm text-muted-foreground">
          Select your product profile to see which regulations affect you
        </p>
      </div>

      {/* Input Form */}
      <Card
        className="border"
        style={{
          background: "oklch(0.13 0.022 250)",
          borderColor: "oklch(0.22 0.03 250)",
        }}
      >
        <CardHeader>
          <CardTitle className="text-sm font-heading">
            Your Product Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              Your Industry
            </Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select your industry..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cosmetics">
                  Cosmetics & Personal Care
                </SelectItem>
                <SelectItem value="industrial">Industrial Chemicals</SelectItem>
                <SelectItem value="consumer">Consumer Products</SelectItem>
                <SelectItem value="coatings">Coatings & Adhesives</SelectItem>
                <SelectItem value="food">Food & Beverage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              Primary Markets
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {markets.map((m) => (
                <label
                  key={m}
                  htmlFor={`market-${m}`}
                  className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-accent"
                  style={{
                    background: selectedMarkets.includes(m)
                      ? "oklch(0.65 0.2 230 / 0.1)"
                      : "transparent",
                  }}
                >
                  <Checkbox
                    id={`market-${m}`}
                    checked={selectedMarkets.includes(m)}
                    onCheckedChange={() => toggleMarket(m)}
                  />
                  <span className="text-sm">{m}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              Product Categories
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {productCategories.map((c) => (
                <label
                  key={c}
                  htmlFor={`cat-${c}`}
                  className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-accent"
                  style={{
                    background: selectedCategories.includes(c)
                      ? "oklch(0.65 0.2 230 / 0.1)"
                      : "transparent",
                  }}
                >
                  <Checkbox
                    id={`cat-${c}`}
                    checked={selectedCategories.includes(c)}
                    onCheckedChange={() => toggleCategory(c)}
                  />
                  <span className="text-sm">{c}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            className="freya-cta w-full"
            onClick={handleGenerate}
            disabled={!industry || loading}
            size="lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing your portfolio...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Generate My Regulatory Radar <ChevronRight size={16} />
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      {showOutput && (
        <div className="space-y-4 animate-fade-in">
          {/* Summary */}
          <Card
            className="border"
            style={{
              background: "oklch(0.14 0.04 240)",
              borderColor: "oklch(0.65 0.2 230 / 0.4)",
            }}
          >
            <CardContent className="p-6 text-center">
              <p
                className="text-5xl font-heading font-bold"
                style={{ color: "oklch(0.72 0.2 230)" }}
              >
                {filteredRegs.length}
              </p>
              <p className="text-lg font-heading font-semibold text-foreground mt-1">
                Regulations Impact Your Portfolio
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: riskDot.high }}
                  />
                  <span className="text-sm">{highCount} High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: riskDot.medium }}
                  />
                  <span className="text-sm">{medCount} Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: riskDot.low }}
                  />
                  <span className="text-sm">
                    {filteredRegs.length - highCount - medCount} Low Risk
                  </span>
                </div>
              </div>
              {/* Risk bar */}
              <div className="flex h-2 rounded-full overflow-hidden mt-4 max-w-sm mx-auto">
                <div
                  style={{
                    width: `${(highCount / filteredRegs.length) * 100}%`,
                    background: riskDot.high,
                  }}
                />
                <div
                  style={{
                    width: `${(medCount / filteredRegs.length) * 100}%`,
                    background: riskDot.medium,
                  }}
                />
                <div style={{ flex: 1, background: riskDot.low }} />
              </div>
            </CardContent>
          </Card>

          {/* Regulation breakdown */}
          <div className="space-y-3">
            {filteredRegs.map((r) => (
              <Card
                key={r.title}
                className="border"
                style={{
                  background: "oklch(0.13 0.022 250)",
                  borderColor: "oklch(0.22 0.03 250)",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: riskDot[r.risk] }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {r.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Affects: {r.affected}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <CheckCircle2
                            size={12}
                            style={{ color: "oklch(0.68 0.18 145)" }}
                          />
                          <span
                            className="text-xs"
                            style={{ color: "oklch(0.8 0.06 145)" }}
                          >
                            {r.action}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge className={riskPill[r.risk]}>
                        {r.risk.toUpperCase()}
                      </Badge>
                      <span
                        className="text-xs"
                        style={{ color: riskDot[r.risk] }}
                      >
                        {r.deadline}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card
            className="border"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.18 0.06 240), oklch(0.15 0.05 260))",
              borderColor: "oklch(0.35 0.1 230)",
            }}
          >
            <CardContent className="p-6 text-center">
              <p className="text-sm font-heading font-bold text-foreground mb-1">
                Get Your Full Portfolio Risk Report
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Detailed SKU-level impact analysis, preparation roadmap &
                executive brief
              </p>
              <Button className="freya-cta">
                <ExternalLink size={14} className="mr-2" />
                Access Full Portfolio Analysis in Freya Fusion
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
