"use client";

import AccordionSection from "./AccordionSection";
import AccordionSectionWithImage from "./AccordionSectionWithImage";
import type { AccordionItemType } from "./accordion.types";

export type AccordionRendererSection = {
    type: "with-image" | "default";
    title: string;
    imageSrc?: string;
    imageAlt?: string;
    items: AccordionItemType[];
};

type AccordionRendererProps = {
    section: AccordionRendererSection;
};

export default function AccordionRenderer({ section }: AccordionRendererProps) {
    if (section.type === "with-image") {
        return (
            <AccordionSectionWithImage
                title={section.title}
                imageSrc={section.imageSrc || ""}
                imageAlt={section.imageAlt || ""}
                items={section.items}
            />
        );
    }

    return <AccordionSection title={section.title} items={section.items} />;
}