import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, ExternalLink, Search, X } from "lucide-react";
import { useState } from "react";

interface Regulation {
  id: number;
  title: string;
  region: string;
  risk: "high" | "medium" | "low";
  categories: string[];
  theme: string;
  publishDate: string;
  enforcement: string;
  progressPct: number;
  actions: string[];
}

const allRegulations: Regulation[] = [
  {
    id: 1,
    title: "OSHA Hazard Communication Standard (HCS)",
    region: "USA",
    risk: "high",
    categories: ["Industrial Chemicals", "Cleaning Products", "Coatings"],
    theme: "Safety",
    publishDate: "Jan 2024",
    enforcement: "May 2025",
    progressPct: 85,
    actions: [
      "Update Safety Data Sheets (SDS)",
      "Revise GHS-compliant labels",
      "Train employees on hazard comm.",
    ],
  },
  {
    id: 2,
    title: "EU CLP Reclassification 2025",
    region: "EU",
    risk: "medium",
    categories: ["Cosmetics", "Personal Care", "Chemicals"],
    theme: "Ingredients",
    publishDate: "Jan 2025",
    enforcement: "Jul 2025",
    progressPct: 60,
    actions: [
      "Review ingredient classifications",
      "Update product labels",
      "Conduct safety assessment",
    ],
  },
  {
    id: 3,
    title: "China Cosmetics Supervision Regulations",
    region: "China",
    risk: "high",
    categories: ["Cosmetics", "Personal Care"],
    theme: "Labeling",
    publishDate: "Mar 2024",
    enforcement: "Jun 2025",
    progressPct: 80,
    actions: [
      "Register products with NMPA",
      "Conduct safety testing",
      "Update labeling to Chinese standards",
    ],
  },
  {
    id: 4,
    title: "PFAS Restrictions Global Expansion",
    region: "Global",
    risk: "high",
    categories: ["Consumer Products", "Coatings", "Industrial"],
    theme: "Sustainability",
    publishDate: "Feb 2025",
    enforcement: "Q4 2025",
    progressPct: 45,
    actions: [
      "Audit PFAS-containing ingredients",
      "Begin reformulation planning",
      "Update compliance documentation",
    ],
  },
  {
    id: 5,
    title: "UK REACH Chemical Update",
    region: "UK",
    risk: "medium",
    categories: ["Industrial Chemicals", "Adhesives", "Coatings"],
    theme: "Safety",
    publishDate: "Jun 2024",
    enforcement: "Q1 2026",
    progressPct: 30,
    actions: [
      "Review UK REACH obligations",
      "Update substance registrations",
      "Prepare technical dossier",
    ],
  },
  {
    id: 6,
    title: "ANVISA Cosmetics Regulation Update",
    region: "Brazil",
    risk: "medium",
    categories: ["Cosmetics", "Personal Care"],
    theme: "Labeling",
    publishDate: "Apr 2025",
    enforcement: "Q4 2025",
    progressPct: 40,
    actions: [
      "Register cosmetics with ANVISA",
      "Translate labels to Portuguese",
      "Update product notifications",
    ],
  },
];

const riskPill: Record<string, string> = {
  high: "bg-risk-high text-red-300 border text-xs",
  medium: "bg-risk-medium text-amber-300 border text-xs",
  low: "bg-risk-low text-green-300 border text-xs",
};
const progressColor: Record<string, string> = {
  high: "oklch(0.62 0.22 25)",
  medium: "oklch(0.78 0.18 65)",
  low: "oklch(0.68 0.18 145)",
};

export function Regulations() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [themeFilter, setThemeFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");

  const filtered = allRegulations.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.region.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === "all" || r.region === regionFilter;
    const matchCat =
      categoryFilter === "all" ||
      r.categories.some((c) =>
        c.toLowerCase().includes(categoryFilter.toLowerCase()),
      );
    const matchTheme = themeFilter === "all" || r.theme === themeFilter;
    const matchImpact = impactFilter === "all" || r.risk === impactFilter;
    return matchSearch && matchRegion && matchCat && matchTheme && matchImpact;
  });

  const hasFilters =
    search ||
    regionFilter !== "all" ||
    categoryFilter !== "all" ||
    themeFilter !== "all" ||
    impactFilter !== "all";

  return (
    <div className="space-y-5">
      {/* Filter Bar */}
      <Card
        className="border"
        style={{
          background: "oklch(0.13 0.022 250)",
          borderColor: "oklch(0.22 0.03 250)",
        }}
      >
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-48">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search regulations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-background border-border text-sm h-9"
              />
            </div>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-36 h-9 text-sm bg-background border-border">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="EU">European Union</SelectItem>
                <SelectItem value="China">China</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
                <SelectItem value="Brazil">Brazil</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 h-9 text-sm bg-background border-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                <SelectItem value="Industrial">Industrial Chemicals</SelectItem>
                <SelectItem value="Consumer">Consumer Products</SelectItem>
                <SelectItem value="Coatings">Coatings</SelectItem>
              </SelectContent>
            </Select>
            <Select value={themeFilter} onValueChange={setThemeFilter}>
              <SelectTrigger className="w-36 h-9 text-sm bg-background border-border">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Themes</SelectItem>
                <SelectItem value="Ingredients">Ingredients</SelectItem>
                <SelectItem value="Labeling">Labeling</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem>
                <SelectItem value="Sustainability">Sustainability</SelectItem>
                <SelectItem value="Claims">Claims</SelectItem>
              </SelectContent>
            </Select>
            <Select value={impactFilter} onValueChange={setImpactFilter}>
              <SelectTrigger className="w-32 h-9 text-sm bg-background border-border">
                <SelectValue placeholder="Impact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Impact</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setSearch("");
                  setRegionFilter("all");
                  setCategoryFilter("all");
                  setThemeFilter("all");
                  setImpactFilter("all");
                }}
              >
                <X size={14} className="mr-1" /> Clear
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {filtered.length} regulation{filtered.length !== 1 ? "s" : ""} found
          </p>
        </CardContent>
      </Card>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((reg) => (
          <Card
            key={reg.id}
            className="border flex flex-col"
            style={{
              background: "oklch(0.13 0.022 250)",
              borderColor: "oklch(0.22 0.03 250)",
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm font-heading leading-snug">
                  {reg.title}
                </CardTitle>
                <Badge className={riskPill[reg.risk]}>
                  {reg.risk.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {reg.region}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor: "oklch(0.3 0.04 250)",
                    color: "oklch(0.65 0.04 230)",
                  }}
                >
                  {reg.theme}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
              {/* Categories */}
              <div className="flex flex-wrap gap-1">
                {reg.categories.slice(0, 3).map((c) => (
                  <span
                    key={c}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.18 0.03 250)",
                      color: "oklch(0.75 0.04 250)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Timeline */}
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{reg.publishDate}</span>
                  <span style={{ color: progressColor[reg.risk] }}>
                    {reg.enforcement}
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full"
                  style={{ background: "oklch(0.2 0.02 250)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${reg.progressPct}%`,
                      background: progressColor[reg.risk],
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Published → Enforcement
                </p>
              </div>

              {/* Actions */}
              <div className="flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Recommended Actions
                </p>
                <ul className="space-y-1.5">
                  {reg.actions.map((a) => (
                    <li key={a} className="flex items-start gap-1.5">
                      <CheckCircle2
                        size={12}
                        className="mt-0.5 shrink-0"
                        style={{ color: "oklch(0.68 0.18 145)" }}
                      />
                      <span className="text-xs text-foreground">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="freya-cta w-full mt-auto" size="sm">
                <ExternalLink size={12} className="mr-1.5" />
                View Detailed Analysis in Freya Fusion
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search size={32} className="mx-auto mb-3 opacity-40" />
          <p>No regulations match your filters</p>
        </div>
      )}
    </div>
  );
}
