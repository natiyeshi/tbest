import { TestimonialsManager } from "@/components/admin/testimonials-manager";
import { getTestimonials } from "@/lib/admin/data";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const testimonials = await getTestimonials();
  return <TestimonialsManager testimonials={testimonials} />;
}
