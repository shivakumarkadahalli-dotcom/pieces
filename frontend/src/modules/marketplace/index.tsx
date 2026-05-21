import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Plus } from "lucide-react";

const sample = [
  { title: "Listing #024", price: "120 XLM", status: "Open" },
  { title: "Listing #023", price: "85 XLM", status: "Filled" },
  { title: "Listing #022", price: "300 XLM", status: "Open" },
];

export function Panel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-brand" />
          <CardTitle>Marketplace</CardTitle>
        </div>
        <Button size="sm" variant="ghost">
          <Plus className="h-4 w-4" /> New listing
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {sample.map((s) => (
          <div key={s.title} className="flex items-center justify-between rounded-xl border border-brand-border px-3 py-2">
            <div className="font-medium">{s.title}</div>
            <div className="font-mono text-brand-ink/70">{s.price}</div>
            <div className="text-xs uppercase tracking-widest text-brand-ink/60">{s.status}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
