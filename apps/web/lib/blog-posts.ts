export type BlogPost = {
  slug: string;
  author: string;
  /** Human-readable display date */
  date: string;
  /** ISO 8601 date for <time dateTime> and structured data */
  dateIso: string;
  title: string;
  excerpt: string;
  /** Full article body — array of paragraphs */
  content: string[];
  image: string;
  imageAlt: string;
  href: string;
};

export const featuredPosts: BlogPost[] = [
  {
    slug: "from-empty-plates-to-bright-futures-afar",
    author: "Bright Future Team",
    date: "June 15, 2026",
    dateIso: "2026-06-15",
    title: "From Empty Plates to Bright Futures: Transforming Lives in Afar",
    excerpt:
      "Since 2023, Bright Future for Children has reached 3,621 vulnerable children in Ethiopia's Afar Zone 2 and 3 through its Food for School initiative — turning daily survival into dreams of education, one breakfast and notebook at a time.",
    content: [
      "In the sun-scorched lands of Ethiopia's Afar Zone 2 and 3, where daily survival has long overshadowed dreams of education, a quiet revolution is taking place. Since 2023, the Bright Future for Children charity has been lighting the path for hundreds of disadvantaged children through their inspiring project, \"Food for School: Making AfAR Children the Next Leaders.\"",
      "Through this initiative, the charity has reached 3,621 vulnerable children aged 2 to 12. Every school day, these young learners receive nutritious breakfast and essential educational materials — items that many families simply could not afford. What began as support for basic needs has blossomed into something far greater.",
      "Since the project started, Awash Primary School has witnessed a remarkable transformation. Enrollment has increased significantly, and children who once struggled are now confidently learning to read and write. Beyond academics, the children have shown visible improvement both physically and mentally — healthier bodies, brighter smiles, and stronger minds ready to take on the future.",
      "The entire community feels the positive ripple effect. Parents in Afar Zone 2 and 3 now send their children to school filled with hope and determination, knowing that education is no longer a distant dream but a daily reality.",
      "Seven-year-old Aman beams with joy when speaking about the program. \"I like it so much,\" he says. \"I am happy because I get my breakfast and educational materials. It helps me a lot.\"",
      "Little Yenus, just three years old, was interviewed by Bright Future for Children staff. With sparkling eyes he shared, \"Before, I could never get food early in the morning because of poverty. Now I am happy to go to school, play with my friends, and learn.\"",
      "Belani, a 39-year-old mother of five, speaks for many families in the community: \"Bright Future for Children is truly benefiting all of us. My children are healthier and learning every day. This program is changing our whole community.\"",
      "Thanks to the dedication of Bright Future for Children, thousands of young Afar lives are no longer defined by hardship, but by possibility. One breakfast, one notebook, and one hopeful morning at a time — the next generation of leaders is rising.",
    ],
    image: "/blog/blog1.jpeg",
    imageAlt:
      "Children in Afar receiving breakfast and educational materials through the Food for School program",
    href: "/stories/from-empty-plates-to-bright-futures-afar",
  },
];

/** Look up a single post by its slug. Returns undefined if not found. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return featuredPosts.find((p) => p.slug === slug);
}
