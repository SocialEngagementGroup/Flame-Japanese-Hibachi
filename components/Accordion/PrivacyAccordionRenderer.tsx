"use client";

import PrivacyAccordionSection from "./PrivacyAccordionSection";
import PrivacyAccordionSectionWithImage from "./PrivacyAccordionSectionWithImage";
import type { AccordionRendererSection } from "./AccordionRenderer";

type PrivacyAccordionRendererProps = {
    section: AccordionRendererSection;
    isOpen: boolean;
    onToggle: () => void;
};

export default function PrivacyAccordionRenderer({ section, isOpen, onToggle }: PrivacyAccordionRendererProps) {
    if (section.type === "with-image") {
        return (
            <PrivacyAccordionSectionWithImage
                title={section.title}
                imageSrc={section.imageSrc || ""}
                imageAlt={section.imageAlt || ""}
                items={section.items}
                isOpen={isOpen}
                onToggle={onToggle}
            />
        );
    }

    return <PrivacyAccordionSection title={section.title} items={section.items} isOpen={isOpen} onToggle={onToggle} />;
}
