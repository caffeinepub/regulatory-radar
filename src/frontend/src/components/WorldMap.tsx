import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CountryData {
  id: string;
  name: string;
  flag: string;
  risk: "high" | "medium" | "low";
  regulation: string;
  deadline: string;
  categories: string[];
  actions: string[];
}

const countries: CountryData[] = [
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    risk: "high",
    regulation: "OSHA Hazard Communication Standard (HCS)",
    deadline: "May 19, 2025",
    categories: ["Industrial Chemicals", "Cleaning Products", "Coatings"],
    actions: [
      "Update Safety Data Sheets (SDS)",
      "Revise GHS-compliant labels",
      "Train employees on hazard comm.",
      "Audit product classifications",
    ],
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    risk: "medium",
    regulation: "PFAS Restrictions Phase 1",
    deadline: "Sep 2025",
    categories: ["Consumer Products", "Coatings", "Textiles"],
    actions: [
      "Audit PFAS-containing ingredients",
      "Begin reformulation planning",
      "Update substance disclosures",
    ],
  },
  {
    id: "brazil",
    name: "Brazil",
    flag: "🇧🇷",
    risk: "medium",
    regulation: "ANVISA Cosmetics Regulation Update",
    deadline: "Q4 2025",
    categories: ["Cosmetics", "Personal Care"],
    actions: [
      "Register products with ANVISA",
      "Translate labels to Portuguese",
      "Update product notifications",
    ],
  },
  {
    id: "eu",
    name: "European Union",
    flag: "🇪🇺",
    risk: "medium",
    regulation: "EU CLP Reclassification 2025",
    deadline: "Jul 2025",
    categories: ["Cosmetics", "Personal Care", "Chemicals"],
    actions: [
      "Review ingredient classifications",
      "Update product labels",
      "Conduct safety assessment",
      "Submit SCCS notifications",
    ],
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    risk: "medium",
    regulation: "UK REACH Chemical Update",
    deadline: "Q1 2026",
    categories: ["Industrial Chemicals", "Adhesives", "Coatings"],
    actions: [
      "Review UK REACH obligations",
      "Update substance registrations",
      "Prepare technical dossiers",
    ],
  },
  {
    id: "russia",
    name: "Russia",
    flag: "🇷🇺",
    risk: "low",
    regulation: "Chemical Registry Maintenance",
    deadline: "Stable",
    categories: ["Industrial Chemicals"],
    actions: ["Monitor regulatory updates", "Maintain current registrations"],
  },
  {
    id: "china",
    name: "China",
    flag: "🇨🇳",
    risk: "high",
    regulation: "Cosmetics Supervision & Admin Regulations",
    deadline: "Jun 2025",
    categories: ["Cosmetics", "Personal Care", "Ingredients"],
    actions: [
      "Register products with NMPA",
      "Conduct safety testing",
      "Update labeling to Chinese standards",
      "Appoint local responsible person",
    ],
  },
  {
    id: "japan",
    name: "Japan",
    flag: "🇯🇵",
    risk: "medium",
    regulation: "Chemical Inventory (CSCL) Updates",
    deadline: "Q2 2025",
    categories: ["Industrial Chemicals", "Cosmetics"],
    actions: [
      "Review CSCL substance notifications",
      "Update import documentation",
      "Conduct new chemical assessments",
    ],
  },
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    risk: "medium",
    regulation: "BIS Cosmetics & Personal Care Standards",
    deadline: "Mar 2026",
    categories: ["Cosmetics", "Personal Care"],
    actions: [
      "Obtain BIS certification",
      "Update product formulations",
      "Submit testing documentation",
    ],
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    risk: "low",
    regulation: "AICIS Chemical Management",
    deadline: "Stable",
    categories: ["Industrial Chemicals", "Consumer Products"],
    actions: ["Maintain current registrations", "Monitor AICIS updates"],
  },
];

// ISO numeric codes → country id
const EU_CODES = new Set([
  "250",
  "276",
  "380",
  "724",
  "528",
  "056",
  "040",
  "752",
  "616",
  "620",
  "203",
  "642",
  "348",
  "100",
  "191",
  "208",
  "246",
  "300",
  "372",
  "428",
  "440",
  "442",
  "470",
  "703",
  "705",
  "233",
  "196",
  // also pad-less versions
  "56",
  "40",
]);

function getCountryId(numericId: string): string | null {
  if (numericId === "840") return "usa";
  if (numericId === "124") return "canada";
  if (numericId === "76") return "brazil";
  if (numericId === "826") return "uk";
  if (numericId === "643") return "russia";
  if (numericId === "156") return "china";
  if (numericId === "392") return "japan";
  if (numericId === "356") return "india";
  if (numericId === "36") return "australia";
  if (EU_CODES.has(numericId)) return "eu";
  return null;
}

const countryById: Record<string, CountryData> = {};
for (const c of countries) countryById[c.id] = c;

const riskFill: Record<string, string> = {
  high: "#c0392b",
  medium: "#d35400",
  low: "#27ae60",
  none: "#1e2d3d",
};
const riskFillHover: Record<string, string> = {
  high: "#e74c3c",
  medium: "#e67e22",
  low: "#2ecc71",
  none: "#2a3f52",
};

const riskLabel: Record<string, string> = {
  high: "HIGH RISK",
  medium: "UPCOMING CHANGES",
  low: "STABLE",
};
const riskBadgeClass: Record<string, string> = {
  high: "bg-red-950 text-red-300 border border-red-700",
  medium: "bg-amber-950 text-amber-300 border border-amber-700",
  low: "bg-green-950 text-green-300 border border-green-700",
};
const riskBorderColor: Record<string, string> = {
  high: "#e74c3c",
  medium: "#e67e22",
  low: "#2ecc71",
};

interface GeoPath {
  id: string;
  path: string;
  countryId: string | null;
}

interface TooltipState {
  x: number;
  y: number;
  country: CountryData;
}

export function WorldMap() {
  const [selected, setSelected] = useState<CountryData | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [geoPaths, setGeoPaths] = useState<GeoPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        const [topoModule, d3Module, topoData] = await Promise.all([
          Function(
            'return import("https://esm.sh/topojson-client@3")',
          )() as Promise<unknown>,
          Function(
            'return import("https://esm.sh/d3-geo@3")',
          )() as Promise<unknown>,
          fetch(
            "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
          ).then((r) => r.json()),
        ]);

        const topojson = topoModule as {
          feature: (
            t: unknown,
            o: unknown,
          ) => { features: { id?: string; geometry: unknown }[] };
        };
        const { geoMercator, geoPath } = d3Module as {
          geoMercator: () => {
            scale: (n: number) => unknown;
            translate: (arr: [number, number]) => unknown;
            center: (arr: [number, number]) => unknown;
            clipExtent: (e: [[number, number], [number, number]]) => unknown;
          };
          geoPath: (proj: unknown) => (feature: unknown) => string | null;
        };

        const W = 900;
        const H = 460;
        const projection = (
          geoMercator() as unknown as {
            scale: (n: number) => typeof projection;
            translate: (a: [number, number]) => typeof projection;
            center: (a: [number, number]) => typeof projection;
          }
        )
          .scale(140)
          .translate([W / 2, H / 2 + 40])
          .center([0, 10]);

        const pathGen = geoPath(projection);

        const countries110 = topojson.feature(
          topoData,
          (topoData as { objects: { countries: unknown } }).objects.countries,
        );

        const paths: GeoPath[] = countries110.features.map((feat) => {
          const numId = String(feat.id ?? "");
          const cId = getCountryId(numId);
          const d = pathGen(feat) ?? "";
          return { id: numId, path: d, countryId: cId };
        });

        setGeoPaths(paths);
        setLoading(false);
      } catch (e) {
        console.error("Map load error", e);
        setError(true);
        setLoading(false);
      }
    };
    loadMap();
  }, []);

  const handleMouseEnter = (path: GeoPath) => {
    if (path.countryId) setHovered(path.id);
  };

  const handleMouseLeave = () => {
    setHovered(null);
    setTooltip(null);
  };

  const handleMouseMove = (
    e: React.MouseEvent<SVGPathElement>,
    path: GeoPath,
  ) => {
    if (!path.countryId) return;
    setTooltip({
      x: e.clientX,
      y: e.clientY,
      country: countryById[path.countryId],
    });
  };

  const handleClick = (path: GeoPath) => {
    if (!path.countryId) return;
    const c = countryById[path.countryId];
    setSelected(selected?.id === c.id ? null : c);
  };

  return (
    <div className="relative w-full">
      {/* Map container */}
      <div
        className="relative rounded-xl overflow-hidden border"
        style={{
          borderColor: "oklch(0.22 0.03 250)",
          background: "oklch(0.08 0.03 230)",
        }}
      >
        {loading && (
          <div
            className="flex items-center justify-center"
            style={{ height: 460, background: "oklch(0.08 0.03 230)" }}
            data-ocid="worldmap.loading_state"
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: "oklch(0.55 0.18 230)" }}
              />
              <span
                style={{ color: "oklch(0.55 0.06 230)" }}
                className="text-sm"
              >
                Loading world map…
              </span>
            </div>
          </div>
        )}

        {error && (
          <div
            className="flex items-center justify-center"
            style={{ height: 460, background: "oklch(0.08 0.03 230)" }}
            data-ocid="worldmap.error_state"
          >
            <span style={{ color: "oklch(0.6 0.18 25)" }} className="text-sm">
              Failed to load map. Check your connection.
            </span>
          </div>
        )}

        {!loading && !error && (
          <svg
            ref={svgRef}
            viewBox="0 0 900 460"
            className="w-full"
            style={{ minHeight: 320, display: "block" }}
            role="img"
            aria-label="Global Regulatory Risk Map"
          >
            <title>Global Regulatory Risk Map</title>
            {/* Ocean */}
            <rect width="900" height="460" fill="#0a1628" />

            {/* Country paths */}
            {geoPaths.map((p) => {
              const cId = p.countryId;
              const country = cId ? countryById[cId] : null;
              const isHovered = hovered === p.id;
              const isSelected = selected && cId === selected.id;
              const risk = country?.risk ?? "none";
              const fill = isHovered ? riskFillHover[risk] : riskFill[risk];

              return (
                <path
                  key={p.id}
                  d={p.path}
                  fill={fill}
                  stroke={isSelected ? "#ffffff" : "#0d1f30"}
                  strokeWidth={isSelected ? 1.5 : 0.4}
                  style={{
                    cursor: cId ? "pointer" : "default",
                    filter:
                      isHovered && cId
                        ? `drop-shadow(0 0 6px ${riskFillHover[risk]}88)`
                        : "none",
                    transition: "fill 0.15s ease, filter 0.15s ease",
                  }}
                  onMouseEnter={() => handleMouseEnter(p)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={(e) => handleMouseMove(e, p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleClick(p);
                  }}
                  onClick={() => handleClick(p)}
                />
              );
            })}
          </svg>
        )}

        {/* Legend */}
        {!loading && !error && (
          <div className="absolute bottom-3 left-3 flex gap-2 text-xs">
            <span
              className="flex items-center gap-1.5 px-2 py-1 rounded-full"
              style={{ background: "rgba(192,57,43,0.25)", color: "#e57070" }}
            >
              🔴 High Risk
            </span>
            <span
              className="flex items-center gap-1.5 px-2 py-1 rounded-full"
              style={{ background: "rgba(211,84,0,0.25)", color: "#e8a060" }}
            >
              🟠 Upcoming
            </span>
            <span
              className="flex items-center gap-1.5 px-2 py-1 rounded-full"
              style={{ background: "rgba(39,174,96,0.25)", color: "#6ddb96" }}
            >
              🟢 Stable
            </span>
            <span
              className="flex items-center gap-1.5 px-2 py-1 rounded-full"
              style={{ background: "rgba(30,45,61,0.6)", color: "#6a85a0" }}
            >
              ⬛ No Data
            </span>
          </div>
        )}

        {/* Click hint */}
        {!loading && !error && !selected && (
          <div
            className="absolute top-3 right-3 text-xs px-2 py-1 rounded"
            style={{
              background: "oklch(0.18 0.03 250 / 0.8)",
              color: "oklch(0.65 0.03 250)",
            }}
          >
            Hover to preview · Click for details
          </div>
        )}
      </div>

      {/* Floating Tooltip — rendered via portal-like fixed positioning */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 16,
            top: tooltip.y - 10,
            zIndex: 9999,
            pointerEvents: "none",
            maxWidth: 288,
            transform:
              tooltip.x > window.innerWidth - 320
                ? "translateX(-110%)"
                : "none",
          }}
          data-ocid="worldmap.tooltip"
        >
          <div
            className="rounded-xl p-4 shadow-2xl"
            style={{
              background: "oklch(0.13 0.03 250)",
              border: `1.5px solid ${riskBorderColor[tooltip.country.risk]}`,
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{tooltip.country.flag}</span>
              <span className="font-bold text-sm" style={{ color: "#e8eef5" }}>
                {tooltip.country.name}
              </span>
              <span
                className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: `${riskBorderColor[tooltip.country.risk]}22`,
                  color: riskBorderColor[tooltip.country.risk],
                  border: `1px solid ${riskBorderColor[tooltip.country.risk]}55`,
                }}
              >
                {riskLabel[tooltip.country.risk]}
              </span>
            </div>

            {/* Regulation */}
            <p
              className="text-xs font-semibold mb-2 leading-snug"
              style={{ color: "#9bb5cc" }}
            >
              {tooltip.country.regulation}
            </p>

            {/* Deadline */}
            <div
              className="flex items-center gap-1 text-xs mb-2"
              style={{ color: riskBorderColor[tooltip.country.risk] }}
            >
              <AlertTriangle size={11} />
              <span className="font-semibold">{tooltip.country.deadline}</span>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1 mb-2">
              {tooltip.country.categories.map((c) => (
                <span
                  key={c}
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    background: "oklch(0.2 0.04 240)",
                    color: "oklch(0.72 0.06 230)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div
              className="border-t pt-2"
              style={{ borderColor: "oklch(0.22 0.04 240)" }}
            >
              <p
                className="text-[10px] uppercase tracking-wider mb-1"
                style={{ color: "oklch(0.5 0.04 240)" }}
              >
                Recommended Actions
              </p>
              <ul className="space-y-1">
                {tooltip.country.actions.slice(0, 3).map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-1.5 text-[11px]"
                    style={{ color: "oklch(0.78 0.04 240)" }}
                  >
                    <CheckCircle2
                      size={10}
                      className="mt-0.5 shrink-0"
                      style={{ color: "oklch(0.62 0.18 145)" }}
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Side Panel (on click) */}
      {selected && (
        <div
          className="mt-4 rounded-xl border p-5"
          style={{
            borderColor: riskBorderColor[selected.risk],
            background: "oklch(0.13 0.025 250)",
          }}
          data-ocid="worldmap.panel"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{selected.flag}</span>
                <h3 className="text-xl font-bold text-white">
                  {selected.name}
                </h3>
                <Badge className={riskBadgeClass[selected.risk]}>
                  {riskLabel[selected.risk]}
                </Badge>
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: "oklch(0.85 0.06 230)" }}
              >
                {selected.regulation}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-slate-400 hover:text-white p-1 rounded"
              data-ocid="worldmap.close_button"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                Key Deadline
              </p>
              <div className="flex items-center gap-2">
                <AlertTriangle
                  size={14}
                  style={{ color: riskBorderColor[selected.risk] }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: riskBorderColor[selected.risk] }}
                >
                  {selected.deadline}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                Affected Categories
              </p>
              <div className="flex flex-wrap gap-1">
                {selected.categories.map((c) => (
                  <Badge key={c} variant="secondary" className="text-xs">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                Recommended Actions
              </p>
              <ul className="space-y-1">
                {selected.actions.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-1.5 text-xs text-slate-200"
                  >
                    <CheckCircle2
                      size={12}
                      className="mt-0.5 shrink-0"
                      style={{ color: "oklch(0.72 0.18 145)" }}
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mt-4 pt-4 border-t"
            style={{ borderColor: "oklch(0.22 0.03 250)" }}
          >
            <Button
              className="freya-cta w-full sm:w-auto"
              size="sm"
              data-ocid="worldmap.primary_button"
            >
              <ExternalLink size={14} className="mr-2" />
              Access Full Regulatory Insight in Freya Fusion
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
