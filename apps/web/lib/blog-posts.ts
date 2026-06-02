export type BlogPost = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const featuredPosts: BlogPost[] = [
  {
    slug: "school-feeding-program-afar",
    category: "Impact",
    date: "May 15, 2026",
    title: "How Our School Feeding Program Is Changing Lives in Afar",
    excerpt:
      "Every morning, 40 children in the Afar region sit down to a warm breakfast before class. What sounds simple is in fact life-changing — learn how consistent nutrition is transforming school attendance and performance.",
    image: "/about-us.png",
    imageAlt: "Children eating a nutritious breakfast at a school in Afar",
    href: "/stories/school-feeding-program-afar",
  },
  {
    slug: "school-supplies-drive-tigray",
    category: "Community",
    date: "April 3, 2026",
    title: "Thousands of Exercise Books Delivered to Tigray Schools",
    excerpt:
      "Thanks to generous donors and local partnerships, we recently distributed over 5,000 exercise books to students in the Tigray region — giving children the tools they need to learn and grow.",
    image: "/mission-background.png",
    imageAlt: "Students receiving exercise books and school materials",
    href: "/stories/school-supplies-drive-tigray",
  },
  {
    slug: "volunteer-spotlight-amhara",
    category: "Stories",
    date: "March 20, 2026",
    title: "Meet the Volunteers Making a Difference in Amhara",
    excerpt:
      "Behind every meal served and every book handed out is a dedicated team of volunteers. We shine a spotlight on the everyday heroes helping us build brighter futures for children in Amhara.",
    image: "/leadership-background.png",
    imageAlt: "Community volunteers working together with children in Amhara",
    href: "/stories/volunteer-spotlight-amhara",
  },
];
