import { brand } from "@/lib/brand";
import { copy } from "@/lib/copy";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-brand-border">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-brand-ink/60 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="font-heading font-semibold text-brand-ink">{brand.name}</div>
          <div>{copy.footer_blurb}</div>
        </div>
        <div className="text-xs uppercase tracking-widest">Stellar testnet</div>
      </div>
    </footer>
  );
}
