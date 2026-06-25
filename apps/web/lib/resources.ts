export type ResourceReport = {
  title: string;
  description: string;
  tag: string;
  year: string;
  href: string;
};

export type ResourceGuide = {
  title: string;
  description: string;
  href: string;
};

export type ExternalResource = {
  title: string;
  description: string;
  href: string;
};

export const resourceReports: ResourceReport[] = [
  {
    title: "2025 Annual Report",
    description:
      "A comprehensive overview of our programs, impact metrics, and financials for the 2025 fiscal year.",
    tag: "Annual Report",
    year: "2025",
    href: "#",
  },
  {
    title: "School Feeding Program Overview",
    description:
      "An in-depth look at how our school feeding programs are structured, funded, and delivered in Afar and Amhara.",
    tag: "Program Report",
    year: "2025",
    href: "#",
  },
  {
    title: "Financial Statement",
    description:
      "Full breakdown of how donor funds are allocated across programs, administration, and fundraising.",
    tag: "Finance",
    year: "2024",
    href: "#",
  },
  {
    title: "Child Nutrition Impact Study",
    description:
      "Research findings on the measurable nutritional and educational outcomes of our meal programs over 18 months.",
    tag: "Research",
    year: "2024",
    href: "#",
  },
];

export const resourceGuides: ResourceGuide[] = [
  {
    title: "Donor Starter Guide",
    description:
      "Everything you need to know about donating, sponsoring a child, and tracking your impact with Bright Future for Children.",
    href: "#",
  },
  {
    title: "How to Claim a Tax Receipt",
    description:
      "Step-by-step instructions for Canadian donors on claiming charitable tax receipts for donations made to our registered charity.",
    href: "#",
  },
  {
    title: "Volunteer & Partnership Handbook",
    description:
      "Learn how individuals and organisations can partner with us — from local volunteers in Ethiopia to corporate sponsors in Canada.",
    href: "#",
  },
];

export const externalResources: ExternalResource[] = [
  {
    title: "UNICEF — Ethiopia Country Profile",
    description: "In-depth data on child welfare, education, and nutrition in Ethiopia.",
    href: "https://www.unicef.org/ethiopia",
  },
  {
    title: "WFP — Ethiopia Situation Report",
    description:
      "The World Food Programme's latest updates on food insecurity across Ethiopian regions.",
    href: "https://www.wfp.org/countries/ethiopia",
  },
  {
    title: "Government of Canada — Charitable Giving",
    description: "Official guidance on charitable giving and tax benefits for Canadian donors.",
    href: "https://www.canada.ca/en/revenue-agency/services/charities-giving.html",
  },
];
