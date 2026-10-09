"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DotSpace } from "@/kits/dot-space/engine/react/DotSpace";
import { serif } from "@/lib/fonts";
import { DOT_PALETTE, homeSteps } from "@/lib/space";

/**
 * Gold dust behind every page: shapes on the homepage, a quiet starfield elsewhere.
 * On paper the dots read darker than on the kit's night sky, so they are a little more
 * transparent, and more so on phones, where a standing shape always crosses some text.
 */
export function SpaceBackground() {
  const path = usePathname();
  const [phone, setPhone] = useState<boolean | null>(null);
  useEffect(() => setPhone(innerWidth <= 768), []);
  if (phone === null) return null;
  const home = path === "/";
  return home ? (
    <DotSpace key="home" steps={homeSteps(serif.style.fontFamily)} palette={DOT_PALETTE} blend="normal" alpha={phone ? 0.4 : 0.55} />
  ) : (
    <DotSpace key={`quiet-${path}`} palette={DOT_PALETTE} blend="normal" alpha={phone ? 0.3 : 0.36} />
  );
}
