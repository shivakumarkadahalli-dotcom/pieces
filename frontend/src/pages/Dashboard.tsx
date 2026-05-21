import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { copy } from "@/lib/copy";
import { brand } from "@/lib/brand";
import { contractIds, explorerForContract } from "@/lib/contracts";
import { shortId } from "@/lib/utils";
import { enabledModules } from "@/modules";
import * as moduleSurfaces from "@/modules";

const sampleSeries = [12, 18, 24, 22, 31, 29, 38, 35, 41, 39, 44, 47];

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 pb-20">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="label-eyebrow mb-2">Dashboard</div>
          <h1 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight">{copy.dashboard_title}</h1>
          <p className="text-brand-ink/70 mt-1 max-w-2xl">{copy.dashboard_subtitle}</p>
        </div>
        <div className="text-xs text-brand-ink/50 font-mono">{brand.projectType}</div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {copy.dashboard_stat_labels.map((label, idx) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-widest text-brand-ink/60">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-semibold">{sampleStat(idx)}</div>
              <Sparkline />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityChart values={sampleSeries} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Deployed contracts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {Object.entries(contractIds).length === 0 && (
              <div className="text-brand-ink/60">Set <code>VITE_CONTRACT_*_ID</code> to populate.</div>
            )}
            {Object.entries(contractIds).map(([mod, id]) => (
              <a
                key={mod}
                href={explorerForContract(id)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-brand-border px-3 py-2 hover:bg-brand-muted/60"
              >
                <span className="capitalize">{mod}</span>
                <span className="font-mono text-brand-ink/70">{shortId(id)}</span>
              </a>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-4">
        {enabledModules.map((m) => {
          const surface = (moduleSurfaces as Record<string, any>)[m];
          const Panel = surface?.Panel;
          if (!Panel) return null;
          return <Panel key={m} />;
        })}
      </div>
    </div>
  );
}

function sampleStat(i: number): string {
  const values = ["$248,910", "1,284", "+12.4%", "98.7%"];
  return values[i % values.length];
}

function Sparkline() {
  const data = [4, 8, 6, 12, 10, 16, 14, 20];
  const w = 120, h = 36, max = Math.max(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} className="mt-2 opacity-90">
      <motion.polyline
        fill="none"
        stroke="var(--brand-primary)"
        strokeWidth={2}
        points={points}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

function ActivityChart({ values }: { values: number[] }) {
  const w = 720, h = 220, pad = 16;
  const max = Math.max(...values), min = Math.min(...values);
  const norm = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  const step = (w - pad * 2) / (values.length - 1);
  const d =
    `M ${pad},${norm(values[0])} ` +
    values
      .slice(1)
      .map((v, i) => `L ${pad + (i + 1) * step},${norm(v)}`)
      .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={d + ` L ${w - pad},${h - pad} L ${pad},${h - pad} Z`}
        fill="url(#grad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--brand-primary)"
        strokeWidth={2.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}
