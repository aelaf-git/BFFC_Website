import { CardNav } from "@/components/layout/card-nav";
import {
  accountLinks,
  dropdownNavItems,
  mainNavLinks,
  primaryCtas,
  siteContact,
} from "@/components/layout/nav-items";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full shrink-0">
      <CardNav
        logoText="BFFC"
        contact={siteContact}
        primaryCtas={primaryCtas}
        mainNavLinks={mainNavLinks}
        accountLinks={accountLinks}
        items={dropdownNavItems}
        baseColor="#ffffff"
      />
    </header>
  );
}
