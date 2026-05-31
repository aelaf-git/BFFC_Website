/** Partner logos — replace files in public/partners/ as real partners are added */
export type Partner = {
  id: string;
  name: string;
  logo: string;
};

export const partners: Partner[] = Array.from({ length: 10 }, (_, index) => {
  const num = String(index + 1).padStart(2, "0");
  return {
    id: `partner-${num}`,
    name: `Partner ${index + 1}`,
    logo: `/partners/partner-${num}.png`,
  };
});
