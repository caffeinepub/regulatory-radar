import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cpu,
  ExternalLink,
  FlaskConical,
  Globe,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const trendData = [
  { year: "2022", EU: 8, USA: 6 },
  { year: "2023", EU: 11, USA: 9 },
  { year: "2024", EU: 15, USA: 12 },
  { year: "2025", EU: 18, USA: 14 },
  { year: "2026F", EU: 22, USA: 16 },
  { year: "2027F", EU: 26, USA: 18 },
];

const themeData = [
  { theme: "Ingredients", count: 34, fill: "oklch(0.65 0.2 230)" },
  { theme: "Labeling", count: 28, fill: "oklch(0.72 0.18 145)" },
  { theme: "Sustainability", count: 24, fill: "oklch(0.62 0.22 25)" },
  { theme: "Safety", count: 21, fill: "oklch(0.78 0.18 65)" },
  { theme: "Claims", count: 16, fill: "oklch(0.65 0.18 300)" },
  { theme: "Packaging", count: 12, fill: "oklch(0.62 0.18 200)" },
];

const insightCards = [
  {
    icon: "🚫",
    title: "Microplastics Phase-Out",
    insight:
      "EU ban affects 500+ cosmetic formulas; reformulation window closes Jun 2026",
    tag: "High Priority",
  },
  {
    icon: "⚗️",
    title: "PFAS Global Phase-Out",
    insight:
      "Global PFAS restrictions accelerating — 40 nations implementing bans by 2027",
    tag: "Watch Closely",
  },
  {
    icon: "🌿",
    title: "Green Claims Crackdown",
    insight:
      "Greenwashing enforcement hitting EU beauty brands; substantiation required",
    tag: "Emerging",
  },
  {
    icon: "🏷️",
    title: "Digital Labeling Mandates",
    insight:
      "QR code labeling requirements emerging across Asia-Pacific markets",
    tag: "Upcoming",
  },
];

const trendMetrics = [
  {
    icon: FlaskConical,
    label: "Ingredients Flagged",
    value: "47",
    sub: "globally under scrutiny",
    color: "oklch(0.62 0.22 25)",
  },
  {
    icon: Globe,
    label: "Regions Tightening",
    value: "12",
    sub: "EU leading regulatory push",
    color: "oklch(0.65 0.2 230)",
  },
  {
    icon: Cpu,
    label: "2026–27 Predicted Bans",
    value: "34+",
    sub: "PFAS expansions forecasted",
    color: "oklch(0.78 0.18 65)",
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) => {
  if (active && payload?.length) {
    return (
      <div
        className="rounded-lg border px-3 py-2 text-xs"
        style={{
          background: "oklch(0.18 0.03 250)",
          borderColor: "oklch(0.3 0.04 250)",
        }}
      >
        <p className="font-bold text-foreground mb-1">{label}</p>
        {payload.map((p, i) => (
          <p
            key={p.dataKey}
            style={{
              color: i === 0 ? "oklch(0.65 0.2 230)" : "oklch(0.72 0.18 65)",
            }}
          >
            {p.dataKey}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function Insights() {
  return (
    <div className="space-y-6">
      {/* Trend metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trendMetrics.map((m) => (
          <Card
            key={m.label}
            className="border"
            style={{
              background: "oklch(0.13 0.022 250)",
              borderColor: `${m.color.replace(")", " / 0.3)")}`,
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <m.icon size={20} style={{ color: m.color }} />
                <TrendingUp size={14} style={{ color: m.color }} />
              </div>
              <p
                className="text-3xl font-heading font-bold"
                style={{ color: m.color }}
              >
                {m.value}
              </p>
              <p className="text-sm font-semibold text-foreground mt-0.5">
                {m.label}
              </p>
              <p className="text-xs text-muted-foreground">{m.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
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
              Regulatory Activity Trend (2022–2027)
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Including 2026–2027 forecast
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.2 0.02 250)"
                />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "oklch(0.6 0.02 250)", fontSize: 11 }}
                />
                <YAxis tick={{ fill: "oklch(0.6 0.02 250)", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="EU"
                  stroke="oklch(0.65 0.2 230)"
                  strokeWidth={2}
                  dot={{ fill: "oklch(0.65 0.2 230)", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="USA"
                  stroke="oklch(0.78 0.18 65)"
                  strokeWidth={2}
                  dot={{ fill: "oklch(0.78 0.18 65)", r: 3 }}
                  strokeDasharray="4 2"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 justify-center">
              <span className="flex items-center gap-1.5 text-xs">
                <span
                  className="w-4 h-0.5 inline-block"
                  style={{ background: "oklch(0.65 0.2 230)" }}
                />{" "}
                EU
              </span>
              <span className="flex items-center gap-1.5 text-xs">
                <span
                  className="w-4 h-0.5 inline-block border-t-2"
                  style={{
                    borderStyle: "dashed",
                    borderColor: "oklch(0.78 0.18 65)",
                  }}
                />{" "}
                USA
              </span>
            </div>
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
              Top Regulatory Themes
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              New regulations by theme in 2025
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={themeData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.2 0.02 250)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fill: "oklch(0.6 0.02 250)", fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="theme"
                  tick={{ fill: "oklch(0.6 0.02 250)", fontSize: 11 }}
                />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div
                        className="rounded-lg border px-3 py-2 text-xs"
                        style={{
                          background: "oklch(0.18 0.03 250)",
                          borderColor: "oklch(0.3 0.04 250)",
                        }}
                      >
                        <p className="text-foreground">
                          {payload[0].value} new rules
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {themeData.map((entry) => (
                    <Cell key={entry.theme} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {insightCards.map((card) => (
          <Card
            key={card.title}
            className="border"
            style={{
              background: "oklch(0.13 0.022 250)",
              borderColor: "oklch(0.22 0.03 250)",
            }}
          >
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{card.icon}</div>
              <p className="text-sm font-heading font-bold text-foreground mb-1">
                {card.title}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {card.insight}
              </p>
              <div className="mt-3">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.65 0.2 230 / 0.15)",
                    color: "oklch(0.75 0.12 230)",
                  }}
                >
                  {card.tag}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Freya Fusion CTA Banner */}
      <div
        className="rounded-xl p-6 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 240), oklch(0.15 0.05 260))",
          border: "1px solid oklch(0.35 0.1 230)",
        }}
      >
        <p className="text-sm font-heading font-bold text-foreground mb-1">
          Get Forward-Looking Regulatory Forecasts
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Predictive trend analysis, ingredient alerts, and intelligence reports
        </p>
        <Button className="freya-cta">
          <ExternalLink size={14} className="mr-2" />
          Access Freya Fusion Intelligence Platform
        </Button>
      </div>
    </div>
  );
}
