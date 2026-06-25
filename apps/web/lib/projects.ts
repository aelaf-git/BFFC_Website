import { academyHeroImage } from "@/lib/academy-assets";

export type Project = {
  slug: string;
  title: string;
  location: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href: string;
  status: string;
  highlights: string[];
};

/** Active and upcoming BFFC projects — extend this list as new projects launch. */
export const projects: Project[] = [
  {
    slug: "afar-empowerment",
    title: "Bright Future Academy for Afar Empowerment",
    location: "Awash 7 Kilo, Afar, Ethiopia",
    excerpt:
      "A modern 430-bed student dormitory on a 10,000 sqm campus, a safe, nurturing home for disadvantaged students from Grade 3 to Grade 9.",
    image: academyHeroImage,
    imageAlt: "Bright Future Academy for Afar Empowerment, Awash, Ethiopia",
    href: "/childrens-village",
    status: "In development",
    highlights: ["430 beds", "10,000 sqm campus", "Grades 3–9"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
