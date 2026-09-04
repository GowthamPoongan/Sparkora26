import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/event";
import { Reveal, Section, SectionHeading } from "./primitives";

export function FAQ() {
  return (
    <Section id="faq">
      <SectionHeading eyebrow="Questions" title="FAQ" />
      <Reveal>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="py-6 text-left font-display text-base tracking-[0.06em] uppercase hover:no-underline sm:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
