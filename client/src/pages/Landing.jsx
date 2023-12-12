import { LandingHero } from "@/components/landing/LandingHero";
import { LandingNav } from "@/components/landing/LandingNav";

export const Landing = () => {
  return (
    <div className="w-screen h-screen">
      <LandingNav />
      <LandingHero />
    </div>
  );
};
