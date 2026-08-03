import { ContactCTA } from "@/components/contact-cta";
import { Firm } from "@/components/sections/firm";
import { Hero } from "@/components/sections/hero";
import { People } from "@/components/sections/people";
import { Practices } from "@/components/sections/practices";
import { Recognition } from "@/components/sections/recognition";
import { Sectors } from "@/components/sections/sectors";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Firm />
      <Practices />
      <Sectors />
      <People />
      <Recognition />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
