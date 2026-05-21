import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Plus } from "lucide-react";

export function Panel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-brand" />
          <CardTitle>Tokens</CardTitle>
        </div>
        <Button size="sm" variant="ghost">
          <Plus className="h-4 w-4" /> Mint
        </Button>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl border border-brand-border bg-brand-muted flex items-end p-3 text-xs text-brand-ink/70">
              #{(i + 1).toString().padStart(3, "0")}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
