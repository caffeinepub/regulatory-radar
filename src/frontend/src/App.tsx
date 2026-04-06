import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Briefcase,
  Clock,
  ExternalLink,
  FileText,
  LayoutDashboard,
  MapIcon,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Insights } from "./components/Insights";
import { Portfolio } from "./components/Portfolio";
import { Regulations } from "./components/Regulations";
import { Timeline } from "./components/Timeline";
import { WorldMap } from "./components/WorldMap";

type Tab =
  | "map"
  | "dashboard"
  | "regulations"
  | "timeline"
  | "insights"
  | "portfolio";

const alerts = [
  {
    risk: "high",
    title: "OSHA Deadline in 47 days",
    sub: "May 19, 2025 — Action required now",
  },
  {
    risk: "medium",
    title: "EU CLP Amendment Published",
    sub: "New classification requirements active",
  },
  {
    risk: "high",
    title: "China NMPA Registration Deadline",
    sub: "Jun 30 — Cosmetics portfolio affected",
  },
];

const riskDot: Record<string, string> = {
  high: "oklch(0.62 0.22 25)",
  medium: "oklch(0.78 0.18 65)",
  low: "oklch(0.68 0.18 145)",
};

const tabs: { key: Tab; label: string; icon: typeof MapIcon }[] = [
  { key: "map", label: "Map", icon: MapIcon },
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "regulations", label: "Regulations", icon: FileText },
  { key: "timeline", label: "Timeline", icon: Clock },
  { key: "insights", label: "Insights", icon: TrendingUp },
  { key: "portfolio", label: "Portfolio", icon: Briefcase },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("map");
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "oklch(0.1 0.025 250)",
        color: "oklch(0.95 0.01 250)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Navbar */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "oklch(0.12 0.022 250 / 0.95)",
          borderColor: "oklch(0.22 0.03 250)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span className="font-heading font-bold text-foreground">
                Regulatory Radar
              </span>
              <Badge
                className="text-xs ml-1 hidden sm:inline-flex"
                style={{
                  background: "oklch(0.65 0.2 230 / 0.2)",
                  color: "oklch(0.75 0.12 230)",
                  border: "1px solid oklch(0.65 0.2 230 / 0.3)",
                }}
              >
                2027
              </Badge>
            </div>

            {/* Nav tabs - desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((t) => (
                <button
                  type="button"
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                  style={
                    activeTab === t.key
                      ? {
                          background: "oklch(0.65 0.2 230 / 0.15)",
                          color: "oklch(0.75 0.15 230)",
                        }
                      : { color: "oklch(0.6 0.02 250)" }
                  }
                >
                  <t.icon size={14} />
                  {t.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  style={{
                    background: notifOpen
                      ? "oklch(0.18 0.025 250)"
                      : "transparent",
                  }}
                >
                  <Bell size={18} />
                  <span className="notification-dot" />
                </button>

                {notifOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-80 rounded-xl border shadow-2xl animate-fade-in"
                    style={{
                      background: "oklch(0.14 0.022 250)",
                      borderColor: "oklch(0.25 0.035 250)",
                    }}
                  >
                    <div
                      className="flex items-center justify-between px-4 py-3 border-b"
                      style={{ borderColor: "oklch(0.22 0.03 250)" }}
                    >
                      <span className="text-sm font-heading font-bold">
                        Smart Alerts
                      </span>
                      <button
                        type="button"
                        onClick={() => setNotifOpen(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="p-2 space-y-1">
                      {alerts.map((a) => (
                        <div
                          key={a.title}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                            style={{ background: riskDot[a.risk] }}
                          />
                          <div>
                            <p className="text-xs font-semibold text-foreground">
                              {a.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {a.sub}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="px-4 py-3 border-t"
                      style={{ borderColor: "oklch(0.22 0.03 250)" }}
                    >
                      <button
                        type="button"
                        className="text-xs w-full text-center"
                        style={{ color: "oklch(0.65 0.15 230)" }}
                      >
                        Manage Alert Preferences →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Button className="freya-cta hidden sm:flex" size="sm">
                Access Freya Fusion{" "}
                <ExternalLink size={12} className="ml-1.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className="md:hidden border-t overflow-x-auto scrollbar-thin flex"
          style={{ borderColor: "oklch(0.2 0.03 250)" }}
        >
          {tabs.map((t) => (
            <button
              type="button"
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="flex-1 flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium min-w-max transition-all"
              style={
                activeTab === t.key
                  ? {
                      color: "oklch(0.75 0.15 230)",
                      borderBottom: "2px solid oklch(0.65 0.2 230)",
                    }
                  : { color: "oklch(0.55 0.02 250)" }
              }
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "map" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.65 0.2 230)" }}
              >
                DECISION INTELLIGENCE PLATFORM
              </p>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground leading-tight mb-3">
                See Regulatory Risks
                <br />
                Before They Impact Your Products
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Explore upcoming global regulatory deadlines and identify which
                product portfolios are exposed.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-5">
                <Button
                  className="freya-cta"
                  onClick={() => setActiveTab("regulations")}
                >
                  Explore Regulatory Risks
                </Button>
                <Button
                  variant="outline"
                  className="border-border"
                  onClick={() => setActiveTab("portfolio")}
                >
                  Check Your Portfolio
                </Button>
              </div>
            </div>
            <WorldMap />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "⚡",
                  title: "Know What Matters Instantly",
                  desc: "Visual risk intelligence instead of dense reports",
                },
                {
                  icon: "🎯",
                  title: "Act Before Regulations Hit",
                  desc: "Forward-looking deadlines and enforcement timelines",
                },
                {
                  icon: "🔄",
                  title: "From Information → Action",
                  desc: "Recommended actions for every regulation",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="rounded-xl p-4 border text-center"
                  style={{
                    background: "oklch(0.13 0.022 250)",
                    borderColor: "oklch(0.22 0.03 250)",
                  }}
                >
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <p className="text-sm font-heading font-bold text-foreground mb-1">
                    {v.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Executive Dashboard
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Global regulatory risk at a glance
              </p>
            </div>
            <Dashboard />
          </div>
        )}

        {activeTab === "regulations" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Regulation Cards
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Filter and explore global regulatory intelligence
              </p>
            </div>
            <Regulations />
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Timeline & Deadlines
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Regulatory milestones from 2025 to 2027
              </p>
            </div>
            <Timeline />
          </div>
        )}

        {activeTab === "insights" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Insights & Trends
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Regulatory intelligence signals and emerging patterns
              </p>
            </div>
            <Insights />
          </div>
        )}

        {activeTab === "portfolio" && (
          <div className="animate-fade-in">
            <Portfolio />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="mt-16 border-t"
        style={{
          background: "oklch(0.12 0.022 250)",
          borderColor: "oklch(0.2 0.03 250)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎯</span>
                <span className="font-heading font-bold text-foreground">
                  Regulatory Radar
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Know what matters. Act before regulations hit.
                <br />
                Turn regulatory complexity into clear decisions.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Quick Links
              </p>
              <div className="space-y-2">
                {tabs.map((t) => (
                  <button
                    type="button"
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className="block text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Powered by
              </p>
              <p className="text-sm font-heading font-bold text-foreground">
                Freya Fusion
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Global Regulatory Intelligence for Consumer & Chemical Products
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Freyr Solutions
              </p>
              <Button className="freya-cta mt-4" size="sm">
                <ExternalLink size={12} className="mr-1.5" />
                Access Freya Fusion
              </Button>
            </div>
          </div>
          <div
            className="border-t mt-8 pt-6 text-center"
            style={{ borderColor: "oklch(0.2 0.03 250)" }}
          >
            <p className="text-xs text-muted-foreground">
              © 2025 Freyr Solutions · Regulatory Radar Intelligence Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
