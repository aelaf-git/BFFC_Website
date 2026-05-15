import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <div
          className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-primary/10"
          aria-hidden
        />
        <Container className="relative py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
            <p className="mb-4 inline-block rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground">
              Welcome to BFFC
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Empowering our community through{" "}
              <span className="text-primary">sport</span> and{" "}
              <span className="text-secondary">opportunity</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              We bring people together with programs, events, and support that
              help every member grow on and off the field.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#programs"
                className="w-full rounded-full bg-primary px-8 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:w-auto"
              >
                Explore programs
              </Link>
              <Link
                href="#about"
                className="w-full rounded-full border-2 border-secondary px-8 py-3.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-white sm:w-auto"
              >
                Learn about us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section id="about" className="border-y border-border bg-background py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Who we are
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                BFFC is dedicated to creating inclusive spaces where athletes,
                families, and neighbors connect. Our work focuses on access,
                mentorship, and lasting impact in the communities we serve.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard value="500+" label="Members supported" accent="primary" />
              <StatCard value="20+" label="Annual events" accent="secondary" />
              <StatCard value="15" label="Partner organizations" accent="secondary" />
              <StatCard value="10+" label="Years of service" accent="primary" />
            </div>
          </div>
        </Container>
      </section>

      <section id="programs" className="bg-background py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Our programs
            </h2>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Structured pathways for youth, adults, and families to participate,
              compete, and lead.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProgramCard
              title="Youth development"
              description="Training, coaching, and life skills for the next generation of leaders."
              accent="primary"
            />
            <ProgramCard
              title="Community leagues"
              description="Inclusive competitions that welcome every skill level and background."
              accent="secondary"
            />
            <ProgramCard
              title="Outreach & wellness"
              description="Health workshops, mentorship, and resources for families in need."
              accent="primary"
            />
          </div>
        </Container>
      </section>

      <section
        id="contact"
        className="bg-gradient-to-r from-secondary to-primary py-16 text-white sm:py-20"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Get involved</h2>
            <p className="mt-4 text-base text-white/90 sm:text-lg">
              Volunteer, partner with us, or reach out to learn how you can support
              BFFC&apos;s mission.
            </p>
            <Link
              href="mailto:hello@bffc.org"
              className="mt-8 inline-block rounded-full bg-background px-8 py-3.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              Contact us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

type Accent = "primary" | "secondary";

function StatCard({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: Accent;
}) {
  const borderColor =
    accent === "primary" ? "border-primary" : "border-secondary";

  return (
    <div
      className={`rounded-2xl border-l-4 ${borderColor} bg-background p-6 shadow-sm ring-1 ring-border`}
    >
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

function ProgramCard({
  title,
  description,
  accent,
}: {
  title: string;
  description: string;
  accent: Accent;
}) {
  const accentBar = accent === "primary" ? "bg-primary" : "bg-secondary";

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className={`mb-4 h-1 w-12 rounded-full ${accentBar}`} aria-hidden />
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
        {description}
      </p>
    </article>
  );
}
