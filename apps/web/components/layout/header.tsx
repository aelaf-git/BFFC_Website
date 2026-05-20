import { CardNav } from "@/components/layout/card-nav";
import {
  accountLinks,
  dropdownNavItems,
  mainNavLinks,
  primaryCtas,
  siteContact,
} from "@/components/layout/nav-items";
import { brand } from "@/lib/brand";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full shrink-0 overflow-visible">
      <CardNav
        logo={brand.logo.src}
        logoAlt={brand.logo.alt}
        logoWidth={brand.logo.width}
        logoHeight={brand.logo.height}
        contact={siteContact}
        primaryCtas={primaryCtas}
        mainNavLinks={mainNavLinks}
        accountLinks={accountLinks}
        items={dropdownNavItems}
      />
    </header>
  );
}
