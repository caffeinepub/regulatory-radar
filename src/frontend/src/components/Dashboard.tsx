import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Clock,
  ExternalLink,
  Flame,
  Globe,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const regionalData = [
  { region: "EU", count: 18, fill: "oklch(0.65 0.2 230)" },
  { region: "USA", count: 14, fill: "oklch(0.6 0.22 25)" },
  { region: "Asia-Pac", count: 11, fill: "oklch(0.72 0.18 65)" },
  { region: "LATAM", count: 7, fill: "oklch(0.7 0.18 145)" },
  { region: "MENA", count: 5, fill: "oklch(0.65 0.18 300)" },
  { region: "Canada", count: 4, fill: "oklch(0.62 0.18 200)" },
];

const categoryData = [
  { name: "Cosmetics", value: 35, fill: "oklch(0.65 0.2 230)" },
  { name: "Industrial", value: 25, fill: "oklch(0.6 0.22 25)" },
  { name: "Consumer", value: 20, fill: "oklch(0.72 0.18 65)" },
  { name: "Coatings", value: 12, fill: "oklch(0.7 0.18 145)" },
  { name: "Other", value: 8, fill: "oklch(0.58 0.15 280)" },
];

const topRegs = [
  {
    name: "OSHA HCS Update",
    region: "USA",
    risk: "high",
    deadline: "May 2025",
  },
  {
    name: "EU CLP Reclassification",
    region: "EU",
    risk: "medium",
    deadline: "Q3 2025",
  },
  {
    name: "China Cosmetics Regs",
    region: "China",
    risk: "high",
    deadline: "Q2 2025",
  },
  {
    name: "PFAS Global Restrictions",
    region: "Global",
    risk: "high",
    deadline: "Q4 2025",
  },
  {
    name: "UK REACH Update",
    region: "UK",
    risk: "medium",
    deadline: "Q1 2026",
  },
];

const deadlines = [
  { label: "OSHA HCS", date: "May 19", risk: "high" },
  { label: "China NMPA", date: "Jun 30", risk: "high" },
  { label: "EU CLP", date: "Jul 1", risk: "medium" },
  { label: "Canada PFAS", date: "Sep 15", risk: "medium" },
  { label: "UK REACH", date: "Jan 2026", risk: "low" },
];

const riskPill: Record<string, string> = {
  high: "bg-risk-high text-red-300 border",
  medium: "bg-risk-medium text-amber-300 border",
  low: "bg-risk-low text-green-300 border",
};
const riskDot: Record<string, string> = {
  high: "oklch(0.62 0.22 25)",
  medium: "oklch(0.78 0.18 65)",
  low: "oklch(0.68 0.18 145)",
};

const kpis = [
  {
    icon: Flame,
    label: "High-Impact Regulations",
    value: "12 Active",
    trend: "+3 this month",
    color: "oklch(0.62 0.22 25)",
    bg: "oklch(0.58 0.22 25 / 0.12)",
  },
  {
    icon: Clock,
    label: "Upcoming Deadlines",
    value: "5 in 90 days",
    trend: "Next: May 19",
    color: "oklch(0.78 0.18 65)",
    bg: "oklch(0.75 0.18 65 / 0.12)",
  },
  {
    icon: Globe,
    label: "Active Regions",
    value: "8 Regions",
    trend: "EU most active",
    color: "oklch(0.65 0.2 230)",
    bg: "oklch(0.65 0.2 230 / 0.12)",
  },
  {
    icon: AlertTriangle,
    label: "Risk Alerts",
    value: "3 Critical",
    trend: "Review required",
    color: "oklch(0.62 0.22 25)",
    bg: "oklch(0.58 0.22 25 / 0.12)",
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg border px-3 py-2 text-xs"
        style={{
          background: "oklch(0.18 0.03 250)",
          borderColor: "oklch(0.3 0.04 250)",
        }}
      >
        <p className="font-bold text-foreground">{label}</p>
        <p style={{ color: "oklch(0.65 0.2 230)" }}>
          {payload[0].value} regulations
        </p>
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card
            key={kpi.label}
            className="border"
            style={{
              background: kpi.bg,
              borderColor: `${kpi.color.replace(")", " / 0.3)")}`,
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    background: `${kpi.color.replace(")", " / 0.15)")}`,
                  }}
                >
                  <kpi.icon size={18} style={{ color: kpi.color }} />
                </div>
                <TrendingUp
                  size={12}
                  style={{ color: kpi.color }}
                  className="mt-1"
                />
              </div>
              <p className="text-2xl font-heading font-bold text-foreground">
                {kpi.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {kpi.label}
              </p>
              <p className="text-xs mt-1" style={{ color: kpi.color }}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          className="border"
          style={{
            background: "oklch(0.13 0.022 250)",
            borderColor: "oklch(0.22 0.03 250)",
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">
              Regional Regulatory Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={regionalData}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.2 0.02 250)"
                />
                <XAxis
                  dataKey="region"
                  tick={{ fill: "oklch(0.6 0.02 250)", fontSize: 11 }}
                />
                <YAxis tick={{ fill: "oklch(0.6 0.02 250)", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {regionalData.map((entry) => (
                    <Cell key={entry.region} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          className="border"
          style={{
            background: "oklch(0.13 0.022 250)",
            borderColor: "oklch(0.22 0.03 250)",
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">
              Most Impacted Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {categoryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {categoryData.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: cat.fill }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {cat.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Regs + Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          className="border"
          style={{
            background: "oklch(0.13 0.022 250)",
            borderColor: "oklch(0.22 0.03 250)",
          }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-heading flex items-center gap-2">
              <Flame size={15} style={{ color: "oklch(0.62 0.22 25)" }} /> Top 5
              High-Impact Regulations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {topRegs.map((r, i) => (
              <div
                key={r.name}
                className="flex items-center justify-between py-2 border-b last:border-0"
                style={{ borderColor: "oklch(0.2 0.02 250)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-4">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {r.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{r.region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${riskPill[r.risk]} text-xs`}>
                    {r.risk.toUpperCase()}
                  </Badge>
                  <span className="text-xs" style={{ color: riskDot[r.risk] }}>
                    {r.deadline}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card
          className="border"
          style={{
            background: "oklch(0.13 0.022 250)",
            borderColor: "oklch(0.22 0.03 250)",
          }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-heading flex items-center gap-2">
              <Clock size={15} style={{ color: "oklch(0.78 0.18 65)" }} />{" "}
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {deadlines.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: riskDot[d.risk] }}
                />
                <div className="flex-1">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ background: "oklch(0.2 0.02 250)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${d.risk === "high" ? 85 : d.risk === "medium" ? 55 : 25}%`,
                        background: riskDot[d.risk],
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs font-semibold text-foreground w-16 text-right">
                  {d.date}
                </p>
                <p className="text-xs text-muted-foreground w-20">{d.label}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button className="freya-cta" size="sm">
          <ExternalLink size={14} className="mr-2" />
          Access Full Executive Intelligence in Freya Fusion
        </Button>
      </div>
    </div>
  );
}
