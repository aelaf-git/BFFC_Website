import { CardNav } from "@/components/layout/card-nav";
import { bffcNavItems } from "@/components/layout/nav-items";

export function Header() {
  return (
    <header className="relative z-50 h-24 w-full shrink-0 md:h-28">
      <CardNav
        logoText="BFFC"
        items={bffcNavItems}
        baseColor="#ffffff"
        menuColor="#000000"
        buttonBgColor="#ea580c"
        buttonTextColor="#ffffff"
        ctaLabel="Get Started"
        ctaHref="/#contact"
      />
    </header>
  );
}
