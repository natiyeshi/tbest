import { ContactCTA } from "@/components/contact-cta";
import { Firm } from "@/components/sections/firm";
import { Hero } from "@/components/sections/hero";
import { People } from "@/components/sections/people";
import { Practices } from "@/components/sections/practices";
import { Sectors } from "@/components/sections/sectors";

export default function Home() {
  return (
    <>
      <Hero />
      <Firm />
      <Practices />
      <Sectors />
      <People />
      <ContactCTA />
    </>
  );
}
