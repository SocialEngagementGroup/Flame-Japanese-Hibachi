export type AccordionContentBlock =
    | {
        type: "paragraph";
        content: string;
    }

    | {
        type: "muted";
        content: string;
    }

    | {
        type: "subheading";
        content: string;
    }

    | {
        type: "list";
        items: string[];
    }

    | {
        type: "table";
        headers: string[];
        rows: string[][];
    };

export type AccordionItemType = {
    /*
     * Internal item name for developers
     * Used for tracking/searching/debugging
     */
    id: string;

    question: string;

    answer: AccordionContentBlock[];
};

export type AccordionSectionProps = {
    title: string;
    items: AccordionItemType[];
    className?: string;
};

export type AccordionSectionWithImageProps = {
    title: string;

    imageSrc: string;

    imageAlt: string;

    items: AccordionItemType[];
};