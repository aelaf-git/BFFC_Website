import { featuredPosts } from "@/lib/blog-posts";
import { faqs } from "@/lib/faqs";
import { resourceGuides, resourceReports } from "@/lib/resources";
import { siteConfig } from "@/lib/site";

export type SearchCategory = "Page" | "Story" | "FAQ" | "Resource" | "Section";

export type SearchDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  keywords?: string[];
  /** Extra searchable text (e.g. FAQ answers, story body) */
  body?: string;
};

const homeSections: SearchDocument[] = [
  {
    id: "section-about",
    title: "About Us",
    description:
      "Learn about Bright Future For Children Ethiopia — our mission, vision, and commitment to children in Afar, Amhara, and Tigray.",
    href: "/#about",
    category: "Section",
    keywords: ["mission", "vision", "charity", "ethiopia"],
  },
  {
    id: "section-what-we-do",
    title: "What We Do",
    description:
      "School feeding, nutrition, education support, and community programs reaching thousands of children across Ethiopia.",
    href: "/#what-we-do",
    category: "Section",
    keywords: ["programs", "feeding", "nutrition", "education", "community goals"],
  },
  {
    id: "section-childrens-village",
    title: "Bright Future Academy for Afar Empowerment",
    description:
      "A modern 430-bed student village rising in Awash — a safe campus for disadvantaged students from Grade 3 to Grade 9.",
    href: "/childrens-village",
    category: "Section",
    keywords: ["afar", "awash", "dormitory", "campus", "children's village"],
  },
  {
    id: "section-partners",
    title: "Our Partners",
    description:
      "UN agencies, government ministries, and NGOs partnering with us to deliver programs across Ethiopia.",
    href: "/#our-partners",
    category: "Section",
    keywords: ["unicef", "wfp", "ngo", "collaboration"],
  },
  {
    id: "section-stories",
    title: "Latest Stories",
    description: "Real stories from the children, communities, and volunteers behind our mission.",
    href: "/#latest-stories",
    category: "Section",
    keywords: ["blog", "news", "impact stories"],
  },
  {
    id: "section-contact",
    title: "Get in Touch",
    description:
      "Contact our team in Calgary or Ethiopia — questions about donations, partnerships, or volunteering.",
    href: "/#get-in-touch",
    category: "Section",
    keywords: ["contact", "email", "phone", "calgary"],
  },
];

const pages: SearchDocument[] = [
  {
    id: "page-home",
    title: "Home",
    description: siteConfig.description,
    href: "/",
    category: "Page",
    keywords: ["bright future", "children", "ethiopia"],
  },
  {
    id: "page-donate",
    title: "Donate",
    description:
      "Make a one-time or monthly donation to feed children and fund education programs in Ethiopia.",
    href: "/donate",
    category: "Page",
    keywords: ["give", "gift", "contribution", "stripe", "monthly"],
  },
  {
    id: "page-ways-to-give",
    title: "Ways to Give",
    description:
      "One-time donations, monthly giving, emergency relief, and corporate partnerships.",
    href: "/ways-to-give",
    category: "Page",
    keywords: ["monthly", "corporate", "emergency", "partnership"],
  },
  {
    id: "page-childrens-village",
    title: "Bright Future Academy for Afar Empowerment",
    description:
      "430-bed student dormitory on a 10,000 sqm campus in Awash 7 Kilo — a safe home for Grades 3–9.",
    href: "/childrens-village",
    category: "Page",
    keywords: ["afar", "awash", "village", "dormitory", "campus", "empowerment"],
    body:
      "Bright Future Children's Village is rising in Awash. Nutritious meals, educational support, dormitories, dining halls, study areas, recreational spaces.",
  },
  {
    id: "page-stories",
    title: "Stories",
    description: "Read impact stories from the communities we serve across Ethiopia.",
    href: "/stories",
    category: "Page",
    keywords: ["blog", "articles", "news"],
  },
  {
    id: "page-faqs",
    title: "Frequently Asked Questions",
    description:
      "Answers about donations, tax receipts, sponsorship, and how we work in Ethiopia.",
    href: "/faqs",
    category: "Page",
    keywords: ["faq", "help", "questions", "tax receipt"],
  },
  {
    id: "page-resources",
    title: "Resources",
    description:
      "Reports, guides, and educational materials about our mission, finances, and programs.",
    href: "/resources",
    category: "Page",
    keywords: ["reports", "annual report", "transparency", "guides"],
  },
  {
    id: "page-privacy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information.",
    href: "/legal/privacy-policy",
    category: "Page",
    keywords: ["legal", "data", "privacy"],
  },
  {
    id: "page-terms",
    title: "Terms of Use",
    description: "Terms and conditions for using the Bright Future For Children website.",
    href: "/legal/terms-of-use",
    category: "Page",
    keywords: ["legal", "terms"],
  },
  {
    id: "page-accessibility",
    title: "Accessibility Statement",
    description: "Our commitment to making this website accessible to all users.",
    href: "/legal/accessibility-statement",
    category: "Page",
    keywords: ["legal", "accessibility", "a11y"],
  },
];

function buildStoryDocuments(): SearchDocument[] {
  return featuredPosts.map((post) => ({
    id: `story-${post.slug}`,
    title: post.title,
    description: post.excerpt,
    href: post.href,
    category: "Story" as const,
    keywords: ["afar", "food for school", "impact"],
    body: post.content.join(" "),
  }));
}

function buildFaqDocuments(): SearchDocument[] {
  return faqs.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    description: faq.answer.slice(0, 160) + (faq.answer.length > 160 ? "…" : ""),
    href: "/faqs",
    category: "FAQ" as const,
    body: faq.answer,
  }));
}

function buildResourceDocuments(): SearchDocument[] {
  const reports = resourceReports.map((report, index) => ({
    id: `resource-report-${index}`,
    title: report.title,
    description: report.description,
    href: "/resources",
    category: "Resource" as const,
    keywords: [report.tag.toLowerCase(), report.year],
    body: `${report.tag} ${report.year} ${report.description}`,
  }));

  const guides = resourceGuides.map((guide, index) => ({
    id: `resource-guide-${index}`,
    title: guide.title,
    description: guide.description,
    href: "/resources",
    category: "Resource" as const,
    body: guide.description,
  }));

  return [...reports, ...guides];
}

/** All searchable documents for the site. */
export const searchIndex: SearchDocument[] = [
  ...pages,
  ...homeSections,
  ...buildStoryDocuments(),
  ...buildFaqDocuments(),
  ...buildResourceDocuments(),
];

/** Quick links shown when the query is empty. */
export const popularSearchLinks: Pick<SearchDocument, "title" | "href" | "description">[] = [
  {
    title: "Donate",
    href: "/donate",
    description: "Support children with a one-time or monthly gift.",
  },
  {
    title: "Bright Future Academy for Afar Empowerment",
    href: "/childrens-village",
    description: "Explore the 430-bed children's village rising in Awash.",
  },
  {
    title: "Stories",
    href: "/stories",
    description: "Read impact stories from the field.",
  },
  {
    title: "FAQs",
    href: "/faqs",
    description: "Common questions about giving and our programs.",
  },
];
