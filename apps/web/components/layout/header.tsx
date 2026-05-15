import Link from "next/link";
import { Container } from "@/components/ui/container";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              B
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              BFFC
            </span>
          </Link>

          <nav
            className="flex items-center gap-3 text-xs sm:gap-6 sm:text-sm"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#contact"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:px-5"
          >
            Get in touch
          </Link>
        </div>
      </Container>
    </header>
  );
}
