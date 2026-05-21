import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import MotionFade from "@/components/MotionFade";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { brand } from "@/lib/brand";
import { copy } from "@/lib/copy";

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as any)[name] ?? Icons.Sparkles;
  return <Cmp className={className ?? "h-5 w-5"} />;
}

export default function Landing() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <MotionFade>
          <div className="label-eyebrow mb-4">{copy.hero_eyebrow}</div>
        </MotionFade>
        <MotionFade delay={0.05}>
          <h1 className="text-4xl md:text-6xl font-heading font-semibold tracking-tight max-w-3xl">
            {copy.hero_title}
          </h1>
        </MotionFade>
        <MotionFade delay={0.1}>
          <p className="mt-5 text-lg text-brand-ink/75 max-w-2xl">{copy.hero_subtitle}</p>
        </MotionFade>
        <MotionFade delay={0.15}>
          <div className="mt-8 flex items-center gap-3">
            <Button asChild size="lg">
              <Link to="/dashboard">{copy.hero_primary_cta}</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/feature">{copy.hero_secondary_cta}</Link>
            </Button>
          </div>
        </MotionFade>
      </section>

      <section className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {copy.features.map((f, i) => (
          <MotionFade key={f.title} delay={0.05 * i}>
            <Card className="h-full">
              <CardHeader>
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-2"
                  style={{ background: "color-mix(in oklab, var(--brand-primary) 18%, transparent)" }}
                >
                  <Icon name={f.icon} className="h-5 w-5 text-brand" />
                </div>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.body}</CardDescription>
              </CardHeader>
            </Card>
          </MotionFade>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 mt-24">
        <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-8">
          <div>
            <div className="label-eyebrow mb-3">Live on Stellar testnet</div>
            <h3 className="text-2xl font-heading font-semibold">{brand.tagline}</h3>
            <p className="text-brand-ink/70 mt-1 max-w-xl">{brand.description}</p>
          </div>
          <Button asChild size="lg">
            <Link to="/dashboard">Open dashboard</Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
