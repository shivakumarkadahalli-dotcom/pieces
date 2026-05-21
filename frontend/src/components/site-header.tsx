import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { brand } from "@/lib/brand";
import { copy } from "@/lib/copy";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { shortId } from "@/lib/utils";

export default function SiteHeader() {
  const { address, connect, connecting } = useWallet();
  const loc = useLocation();

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-brand-bg/70 border-b border-brand-border">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-lg">
          <motion.span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--brand-primary)" }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <span className="font-semibold tracking-tight">{brand.name}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {copy.nav_links.map((l) => {
            const active = loc.pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                className={
                  "px-3 py-2 rounded-lg transition " +
                  (active ? "text-brand-ink bg-brand-muted" : "text-brand-ink/70 hover:text-brand-ink")
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Button
          variant={address ? "ghost" : "primary"}
          size="sm"
          onClick={connect}
          disabled={connecting}
        >
          <Wallet className="h-4 w-4" />
          {address ? shortId(address) : connecting ? "Connecting…" : "Connect Freighter"}
        </Button>
      </div>
    </header>
  );
}
