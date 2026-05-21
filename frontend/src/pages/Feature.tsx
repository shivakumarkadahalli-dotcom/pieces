import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { copy } from "@/lib/copy";
import { brand } from "@/lib/brand";
import * as Icons from "lucide-react";
import MotionFade from "@/components/MotionFade";

function Icon({ name }: { name: string }) {
  const Cmp = (Icons as any)[name] ?? Icons.Sparkles;
  return <Cmp className="h-5 w-5 text-brand" />;
}

export default function Feature() {
  const f = copy.features[0];
  return (
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-24">
      <MotionFade>
        <div className="label-eyebrow mb-3">{brand.projectType.replace(/_/g, " ")}</div>
      </MotionFade>
      <MotionFade delay={0.05}>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight max-w-3xl">{f.title}</h1>
      </MotionFade>
      <MotionFade delay={0.1}>
        <p className="text-brand-ink/75 mt-4 max-w-2xl text-lg">{f.body}</p>
      </MotionFade>

      <div className="mt-12 grid md:grid-cols-2 gap-4">
        {copy.features.map((feat, i) => (
          <MotionFade key={feat.title} delay={0.04 * i}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon name={feat.icon} />
                  <CardTitle>{feat.title}</CardTitle>
                </div>
                <CardDescription>{feat.body}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-brand-ink/70">
                Built on Stellar testnet with Soroban smart contracts.
              </CardContent>
            </Card>
          </MotionFade>
        ))}
      </div>
    </div>
  );
}
