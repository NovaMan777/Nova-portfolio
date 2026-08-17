import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Director, TechCorp",
    content:
      "Working with Tomas was seamless from day one. He delivered a full-stack solution ahead of schedule and stayed clear in every update. It's rare to find an engineer who understands both the tech and the business this well.",
    rating: 5,
    image: "/testimonials/alex-johnson.png",
  },
  {
    id: 2,
    name: "Maria Chen",
    role: "Senior UX Designer, DesignHub",
    content:
      "I've reviewed hundreds of portfolios, and his work is exceptional. The way motion guides attention without hurting performance is masterful — depth without noise.",
    rating: 5,
    image: "/testimonials/maria-chen.png",
  },
  {
    id: 3,
    name: "David Wilson",
    role: "CTO, Startup Ventures",
    content:
      "From wireframes to deployment, Tomas owned the stack with confidence. The product is fast, reliable, and looks considered. I wouldn't hesitate to work together again.",
    rating: 5,
    image: "/testimonials/David Wilson.png",
  },
];

export const TestimonialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="relative py-20 md:py-28 px-4" ref={ref}>
      <div className="container max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Kind words"
          title="What collaborators"
          highlight="remember."
          description="Notes from people I've built with — the part of the work that doesn't show up in a repo."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="bg-card border border-border rounded-3xl p-7 flex flex-col text-left hover:border-primary/30 transition-colors"
            >
              <Quote className="h-6 w-6 text-primary/40 mb-4" />
              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed flex-1">
                {testimonial.content}
              </p>
              <div className="flex gap-0.5 mt-5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < testimonial.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="h-11 w-11 rounded-full overflow-hidden border border-border bg-muted">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
