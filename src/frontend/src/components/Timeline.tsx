import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const allEvents = [
  {
    date: "Jan 2025",
    label: "EU CLP Amendment Published",
    region: "EU",
    category: "Chemicals",
    status: "safe",
    desc: "New hazard classification rules published",
  },
  {
    date: "Mar 2025",
    label: "OSHA Employee Training Deadline",
    region: "USA",
    category: "Chemicals",
    status: "urgent",
    desc: "All employees must complete HCS training",
  },
  {
    date: "May 2025",
    label: "OSHA HCS Full Enforcement",
    region: "USA",
    category: "Chemicals",
    status: "urgent",
    desc: "Full enforcement of updated HCS standard",
  },
  {
    date: "Jun 2025",
    label: "China NMPA Cosmetics Deadline",
    region: "China",
    category: "Cosmetics",
    status: "urgent",
    desc: "Product registration required for all cosmetics",
  },
  {
    date: "Jul 2025",
    label: "EU CLP Enforcement Begins",
    region: "EU",
    category: "Chemicals",
    status: "action",
    desc: "Mandatory reclassification under CLP ATP 20",
  },
  {
    date: "Sep 2025",
    label: "Canada PFAS Phase 1 Restrictions",
    region: "Canada",
    category: "Chemicals",
    status: "action",
    desc: "Phase 1 PFAS restrictions come into effect",
  },
  {
    date: "Q4 2025",
    label: "UK REACH Substance Updates",
    region: "UK",
    category: "Chemicals",
    status: "action",
    desc: "Updated substance authorisation requirements",
  },
  {
    date: "Q4 2025",
    label: "Brazil ANVISA Cosmetics",
    region: "Brazil",
    category: "Cosmetics",
    status: "action",
    desc: "New cosmetics notification requirements",
  },
  {
    date: "Jan 2026",
    label: "PFAS Global Expansion Phase 2",
    region: "Global",
    category: "Chemicals",
    status: "safe",
    desc: "Extended PFAS restrictions across 34+ nations",
  },
  {
    date: "Mar 2026",
    label: "India BIS Cosmetics Standards",
    region: "India",
    category: "Cosmetics",
    status: "safe",
    desc: "Mandatory BIS certification for cosmetics",
  },
  {
    date: "Jun 2026",
    label: "EU Microplastics Ban Phase 1",
    region: "EU",
    category: "Cosmetics",
    status: "safe",
    desc: "Ban on intentionally added microplastics",
  },
  {
    date: "2027",
    label: "EU Green Claims Directive",
    region: "EU",
    category: "Cosmetics",
    status: "safe",
    desc: "Mandatory substantiation for all green claims",
  },
  {
    date: "2027",
    label: "Global AI Cosmetics Testing Standards",
    region: "Global",
    category: "Cosmetics",
    status: "safe",
    desc: "Emerging framework for AI-based safety testing",
  },
];

const statusConfig = {
  urgent: {
    label: "URGENT",
    color: "oklch(0.62 0.22 25)",
    bg: "oklch(0.58 0.22 25 / 0.15)",
    borderColor: "oklch(0.58 0.22 25 / 0.4)",
    dotColor: "oklch(0.65 0.22 25)",
    pillClass: "bg-risk-high text-red-300 border",
  },
  action: {
    label: "ACTION PHASE",
    color: "oklch(0.78 0.18 65)",
    bg: "oklch(0.75 0.18 65 / 0.15)",
    borderColor: "oklch(0.75 0.18 65 / 0.4)",
    dotColor: "oklch(0.78 0.18 65)",
    pillClass: "bg-risk-medium text-amber-300 border",
  },
  safe: {
    label: "SAFE WINDOW",
    color: "oklch(0.68 0.18 145)",
    bg: "oklch(0.62 0.18 145 / 0.15)",
    borderColor: "oklch(0.62 0.18 145 / 0.4)",
    dotColor: "oklch(0.68 0.18 145)",
    pillClass: "bg-risk-low text-green-300 border",
  },
};

const filters = [
  { key: "all", label: "All" },
  { key: "urgent", label: "🔴 Urgent" },
  { key: "action", label: "🟠 Action Phase" },
  { key: "safe", label: "🟢 Safe Window" },
  { key: "Cosmetics", label: "Cosmetics" },
  { key: "Chemicals", label: "Chemicals" },
];

export function Timeline() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = allEvents.filter((e) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "Cosmetics" || activeFilter === "Chemicals")
      return e.category === activeFilter;
    return e.status === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            type="button"
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeFilter === f.key
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={
              activeFilter === f.key
                ? { background: "oklch(0.65 0.2 230)", color: "white" }
                : {
                    background: "oklch(0.17 0.025 250)",
                    border: "1px solid oklch(0.25 0.03 250)",
                  }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[72px] top-4 bottom-4 w-px"
          style={{ background: "oklch(0.25 0.03 250)" }}
        />

        <div className="space-y-4">
          {filtered.map((event) => {
            const cfg = statusConfig[event.status as keyof typeof statusConfig];
            return (
              <div
                key={`${event.date}-${event.label}`}
                className="flex items-start gap-4 animate-fade-in"
              >
                {/* Date */}
                <div className="w-16 shrink-0 text-right">
                  <span className="text-xs font-mono text-muted-foreground">
                    {event.date}
                  </span>
                </div>

                {/* Dot */}
                <div className="relative z-10 shrink-0">
                  <div
                    className="w-3 h-3 rounded-full mt-0.5"
                    style={{
                      background: cfg.dotColor,
                      boxShadow: `0 0 8px ${cfg.dotColor}`,
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-lg border p-3"
                  style={{ background: cfg.bg, borderColor: cfg.borderColor }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {event.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {event.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {event.region}
                      </Badge>
                      <Badge className={`${cfg.pillClass} text-xs`}>
                        {cfg.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button className="freya-cta" size="sm">
          <ExternalLink size={14} className="mr-2" />
          Get Full 2025–2027 Regulatory Forecast in Freya Fusion
        </Button>
      </div>
    </div>
  );
}
