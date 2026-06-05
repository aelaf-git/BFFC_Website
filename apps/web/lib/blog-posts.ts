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
    slug: "school-feeding-program-afar",
    author: "Bright Future Team",
    date: "May 15, 2026",
    dateIso: "2026-05-15",
    title: "How Our School Feeding Program Is Changing Lives in Afar",
    excerpt:
      "Every morning, 40 children in the Afar region sit down to a warm breakfast before class. What sounds simple is in fact life-changing — learn how consistent nutrition is transforming school attendance and performance.",
    content: [
      "Every morning, before the sun climbs high over the Afar lowlands, 40 children gather at their local school for a warm breakfast. For many of them, this is the only guaranteed meal of the day. What sounds like a simple act of kindness is, in reality, a lifeline — one that is measurably changing the trajectory of hundreds of young lives.",
      "Bright Future For Children Ethiopia launched its school feeding program in the Afar region in response to a stark reality: children who arrive at school hungry cannot learn. Teachers reported that attendance was erratic, concentration was poor, and dropout rates — especially among girls — were alarmingly high. Food insecurity was not just a health crisis; it was an education crisis.",
      "Since the program began, school attendance among participating children has risen by over 60%. Teachers note that children are more alert, more participatory, and less likely to leave school early. For families who previously kept children home to help forage for food, the promise of a nutritious meal at school has become a powerful incentive to enrol and stay.",
      "The meals are carefully designed in collaboration with local nutritionists and community elders to be culturally appropriate and nutritionally balanced. They typically include a combination of injera, lentils, and seasonal vegetables — providing the protein, carbohydrates, and micronutrients growing children need. We source ingredients locally where possible, which also supports small farmers in the region.",
      "Behind every meal served is a team of community volunteers, local administrators, and partner organisations who believe that feeding a child is an investment in the future of an entire community. Your donations make this possible. With just a few dollars a month, you can ensure a child in Afar starts their day not with hunger, but with hope.",
    ],
    image: "/about-us.png",
    imageAlt: "Children eating a nutritious breakfast at a school in Afar",
    href: "/stories/school-feeding-program-afar",
  },
  {
    slug: "school-supplies-drive-tigray",
    author: "Aelaf Eskinder",
    date: "April 3, 2026",
    dateIso: "2026-04-03",
    title: "Thousands of Exercise Books Delivered to Tigray Schools",
    excerpt:
      "Thanks to generous donors and local partnerships, we recently distributed over 5,000 exercise books to students in the Tigray region — giving children the tools they need to learn and grow.",
    content: [
      "Earlier this spring, a convoy of vehicles wound its way through the hills of Tigray, carrying a cargo that may seem ordinary in much of the world but is anything but ordinary here: thousands of exercise books, pencils, and learning materials for children who have spent years without adequate school supplies.",
      "The conflict that swept through Tigray left education infrastructure in ruins. Schools were damaged, teachers displaced, and entire generations of children lost years of schooling. As communities begin the long process of rebuilding, the hunger to return to learning is palpable — but the tools to do so are in desperately short supply.",
      "Our school supplies drive, made possible through the generosity of donors across Canada and around the world, delivered over 5,000 exercise books to 12 schools across Tigray. Each book was distributed directly to students by their teachers, and the scenes of children receiving their own materials — some for the very first time — were deeply moving.",
      "One teacher in a small village outside Adwa described the impact: 'Before, children shared one book between three students, or they wrote on the ground with sticks. Now each child has their own book. You can see the pride on their faces.' Such moments remind us why every donation, no matter the size, translates into something tangible and transformative.",
      "We are committed to expanding this program to reach more schools in the coming months. If you would like to sponsor a school supply kit for a child in Tigray, please consider making a donation. Together, we can ensure that no child is held back from learning simply because they lack a pencil and a page to write on.",
    ],
    image: "/mission-background.png",
    imageAlt: "Students receiving exercise books and school materials",
    href: "/stories/school-supplies-drive-tigray",
  },
  {
    slug: "volunteer-spotlight-amhara",
    author: "Bright Future Team",
    date: "March 20, 2026",
    dateIso: "2026-03-20",
    title: "Meet the Volunteers Making a Difference in Amhara",
    excerpt:
      "Behind every meal served and every book handed out is a dedicated team of volunteers. We shine a spotlight on the everyday heroes helping us build brighter futures for children in Amhara.",
    content: [
      "They wake before dawn. They travel long distances on unpaved roads. They give their weekends, their evenings, and sometimes much more. They are the volunteers of Bright Future For Children Ethiopia — and without them, none of what we do would be possible.",
      "In the Amhara region, our volunteer network has grown to over 50 individuals from all walks of life: retired teachers, university students, local business owners, and parents. What unites them is a shared conviction that the children of Amhara deserve better — better food, better education, and better futures.",
      "Tadesse, a retired primary school principal from Bahir Dar, has been volunteering with us since the programme's inception. Now in his late sixties, he coordinates meal distribution at three local schools every week. 'I spent my life teaching children,' he says. 'Now I help make sure they are strong enough to learn. It is the same work, just a different kind.'",
      "Mekdes, a 22-year-old university student studying public health, first joined as a one-time volunteer but has stayed for two years. She conducts nutritional assessments on participating children and helps train community health workers in basic child nutrition. 'The data we collect is showing real results,' she tells us. 'Children who were stunted a year ago are now at healthy weights. That is because of consistent meals and community care.'",
      "Volunteering with Bright Future For Children Ethiopia is open to anyone who shares our mission. Whether you are based in Ethiopia or abroad, there are meaningful ways to contribute your time and skills. Reach out to us through our contact page to learn how you can get involved. Every hour you give is an hour invested in a child's future.",
    ],
    image: "/leadership-background.png",
    imageAlt: "Community volunteers working together with children in Amhara",
    href: "/stories/volunteer-spotlight-amhara",
  },
];

/** Look up a single post by its slug. Returns undefined if not found. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return featuredPosts.find((p) => p.slug === slug);
}
