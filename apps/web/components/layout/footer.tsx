import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">BFFC</p>
            <p className="mt-1 max-w-sm text-sm text-muted">
              Building futures through community, sport, and opportunity.
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-6 text-sm font-medium"
            aria-label="Footer navigation"
          >
            <Link href="#about" className="hover:text-secondary">
              About
            </Link>
            <Link href="#programs" className="hover:text-secondary">
              Programs
            </Link>
            <Link href="#contact" className="hover:text-secondary">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:justify-between">
          <p>&copy; {year} BFFC. All rights reserved.</p>
          <p>Designed with care for every screen size.</p>
        </div>
      </Container>
    </footer>
  );
}
