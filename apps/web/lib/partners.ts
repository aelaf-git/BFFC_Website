/** Partner logos — files live in public/partners/ */
export type Partner = {
  id: string;
  name: string;
  logo: string;
};

export const partners: Partner[] = [
  // International organizations & NGOs
  { id: "unicef", name: "UNICEF", logo: "/partners/UNICEF.png" },
  { id: "world-food-programme", name: "World Food Programme", logo: "/partners/World-Food-Programme.png" },
  { id: "world-health-organization", name: "World Health Organization", logo: "/partners/World-Health-Organization.jpg" },
  { id: "unesco", name: "UNESCO", logo: "/partners/UNESCO.jpg" },
  {
    id: "united-nations-development-programme",
    name: "United Nations Development Programme",
    logo: "/partners/United-Nations-Development-Programme.png",
  },
  {
    id: "food-and-agriculture-organization",
    name: "Food and Agriculture Organization",
    logo: "/partners/Food-and-Agriculture-Organization.png",
  },
  {
    id: "international-organization-for-migration",
    name: "International Organization for Migration",
    logo: "/partners/International-Organization-for-Migration.png",
  },
  { id: "save-the-children", name: "Save the Children", logo: "/partners/Save-the-Children.png" },
  { id: "world-vision", name: "World Vision", logo: "/partners/World-Vision.jpeg" },
  { id: "care-international", name: "CARE International", logo: "/partners/CARE-International.jpg" },
  { id: "mercy-corps", name: "Mercy Corps", logo: "/partners/Mercy-Corps.avif" },
  { id: "plan-international", name: "Plan International", logo: "/partners/Plan-International.jpeg" },
  { id: "catholic-relief-services", name: "Catholic Relief Services", logo: "/partners/Catholic-Relief-Services.png" },

  // Federal government
  { id: "ministry-of-health", name: "Ministry of Health", logo: "/partners/Ministry-of-Health.png" },
  { id: "ministry-of-education", name: "Ministry of Education", logo: "/partners/Ministry-of-Education.jpg" },
  { id: "ministry-of-agriculture", name: "Ministry of Agriculture", logo: "/partners/Ministry-of-Agriculture.png" },
  {
    id: "ministry-of-women-and-social-affairs",
    name: "Ministry of Women and Social Affairs",
    logo: "/partners/Ministry-of-Women-and-Social-Affairs.jpg",
  },
  {
    id: "ethiopian-public-health-institute",
    name: "Ethiopian Public Health Institute",
    logo: "/partners/Ethiopian-Public-Health-Institute.jpg",
  },
  {
    id: "disaster-risk-management-commission",
    name: "Disaster Risk Management Commission",
    logo: "/partners/Disaster-Risk-Management-Commission.jpg",
  },

  // Regional bureaus
  {
    id: "amhara-regional-health-bureau",
    name: "Amhara Regional Health Bureau",
    logo: "/partners/Amhara-Regional-Health-Bureau.png",
  },
  {
    id: "amhara-regional-education-bureau",
    name: "Amhara Regional Education Bureau",
    logo: "/partners/Amhara-Regional-Education-Bureau.jpg",
  },
  {
    id: "afar-regional-health-bureau",
    name: "Afar Regional Health Bureau",
    logo: "/partners/Afar-Regional-Health-Bureau.jpg",
  },
  {
    id: "afar-regional-education-bureau",
    name: "Afar Regional Education Bureau",
    logo: "/partners/Afar-Regional-Education-Bureau.png",
  },
  {
    id: "tigray-regional-health-bureau",
    name: "Tigray Regional Health Bureau",
    logo: "/partners/Tigray-Regional-Health-Bureau.jpg",
  },
  {
    id: "tigray-regional-education-bureau",
    name: "Tigray Regional Education Bureau",
    logo: "/partners/Tigray-Regional-Education-Bureau.jpg",
  },
];
