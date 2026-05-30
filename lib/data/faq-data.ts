import type { AccordionRendererSection } from "@/components/Accordion/AccordionRenderer";

export const faqSections: AccordionRendererSection[] = [
    {
        type: "with-image",
        title: "Ordering & DoorDash",
        imageSrc: "/faq/faq-section-img.png",
        imageAlt: "Flame Japanese Hibachi Ordering",
        items: [
            {
                id: "place-order",
                question: "How do I place an order with Flame Japanese Hibachi?",
                answer: [
                    {
                        type: "paragraph",
                        content: `It's easy! Click the "Order Now" button on our website and you'll be taken to our ordering page powered by DoorDash. From there, you can browse our menu, customize your meal, and pay securely—all through DoorDash's platform.`,
                    },
                ],
            },
            {
                id: "doordash-account",
                question: "Do I need a DoorDash account to order?",
                answer: [
                    {
                        type: "paragraph",
                        content: `DoorDash may allow you to check out as a guest, though creating a free DoorDash account makes it easier to track your order and save your preferences for future visits. Please check the DoorDash platform for the most current guest checkout options.`,
                    },
                ],
            },
            {
                id: "direct-website-order",
                question:
                    "Can I order directly through the Flame Japanese Hibachi website?",
                answer: [
                    {
                        type: "paragraph",
                        content: `At this time, we use DoorDash as our online ordering partner. Clicking "Order Now" on our site redirects you to DoorDash to complete your order. We do not process transactions or store payment information on our own website.`,
                    },
                ],
            },
            {
                id: "dine-in-takeout-delivery",
                question: "Do you offer dine-in and takeout in addition to delivery?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Yes! We offer dine-in and takeout at all of our locations. You can also select pickup or delivery options through the DoorDash ordering platform. For store-specific questions about dine-in, please contact your nearest location directly.`,
                    },
                ],
            },
            {
                id: "nearest-location",
                question: "How do I find my nearest Flame Japanese Hibachi location?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Visit the Location page on our website at www.flamehibachi.com/locations. We currently have locations in Maryland, Virginia, Pennsylvania, and Florida, with new locations opening soon.`,
                    },
                ],
            },
        ],
    },

    {
        type: "default",
        title: "Your Personal Information",
        items: [
            {
                id: "personal-information-collected",
                question:
                    "What personal information does Flame Japanese Hibachi collect from me?",
                answer: [
                    {
                        type: "paragraph",
                        content: `When you visit our website, we may collect basic technical information such as your IP address, browser type, and pages visited—automatically through analytics tools. If you contact us via our contact form or email, we collect the information you voluntarily provide, like your name, email address, and message. We do not collect payment details, delivery addresses, or order information directly.`,
                    },
                ],
            },
            {
                id: "payment-delivery-information",
                question:
                    "Who collects my payment and delivery information when I order?",
                answer: [
                    {
                        type: "paragraph",
                        content: `DoorDash collects and manages all payment and delivery information when you place an order through their platform. Flame Japanese Hibachi does not receive or store your full payment card details. We may receive basic order information (like items ordered and pickup status) from DoorDash to prepare your food, but not your financial data. For questions about how DoorDash handles your data, visit doordash.com/privacy.`,
                    },
                ],
            },
            {
                id: "sell-personal-information",
                question: "Does Flame Japanese Hibachi sell my personal information?",
                answer: [
                    {
                        type: "paragraph",
                        content: `No. We do not sell your personal information to third parties. We use your information only to operate our website, respond to your inquiries, and improve our services. For more details, see our Privacy Policy.`,
                    },
                ],
            },
            {
                id: "analytics-data",
                question: "Why do you collect analytics data on my website visits?",
                answer: [
                    {
                        type: "paragraph",
                        content: `We use tools like Google Analytics to understand how people use our website—for example, which pages are most popular, how long visitors stay, and where they come from. This helps us improve our site and better serve you. This data is aggregated and does not identify you personally.`,
                    },
                ],
            },
        ],
    },

    {
        type: "default",
        title: "Data Security & Protection",
        items: [
            {
                id: "protect-personal-information",
                question:
                    "How does Flame Japanese Hibachi protect my personal information?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Our website uses HTTPS encryption to secure all data transmitted between your device and our servers. We limit access to contact information to authorized staff only, and we use reputable third-party platforms that maintain their own security certifications. That said, no online system is completely risk-free, so we encourage you to use strong passwords and secure networks.`,
                    },
                ],
            },
            {
                id: "doordash-payment-security",
                question:
                    "How is my payment information protected when I order through DoorDash?",
                answer: [
                    {
                        type: "paragraph",
                        content: `DoorDash uses industry-standard security practices, including encryption and secure payment processing, to protect your payment information. Because payment data flows entirely through DoorDash's systems—not ours—their security standards apply directly to your financial data. You can review DoorDash's security practices in their Privacy Policy at doordash.com/privacy.`,
                    },
                ],
            },
            {
                id: "business-sale-acquisition",
                question:
                    "What happens to my information if Flame Japanese Hibachi is sold or acquired?",
                answer: [
                    {
                        type: "paragraph",
                        content: `In the event of a merger, acquisition, or sale of assets, your personal information may be transferred to the new entity. We will notify you of any such change by posting a notice on our website. The new entity would be required to honor the commitments made in this Privacy Policy.`,
                    },
                ],
            },
        ],
    },

    {
        type: "default",
        title: "Cookies & Advertising",
        items: [
            {
                id: "cookies-usage",
                question: "What are cookies, and does your website use them?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Cookies are small data files stored on your device when you visit a website. Yes, our website uses cookies. We use essential cookies to keep the website running properly, analytics cookies (through Google) to understand visitor behavior, and advertising cookies (through Meta/Facebook Pixel) to measure how well our ads perform.`,
                    },
                ],
            },
            {
                id: "opt-out-cookies-tracking",
                question: "Can I opt out of cookies or tracking?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Yes. You can control cookies through your browser settings—most browsers let you block or delete cookies at any time. You can also opt out of Google Analytics tracking by installing the Google Analytics Opt-Out Browser Add-on (available at tools.google.com/dlpage/gaoptout), and opt out of Meta ad tracking through your Facebook ad preferences at facebook.com/ads/preferences. Note that disabling certain cookies may affect how some parts of our website work.`,
                    },
                ],
            },
            {
                id: "targeted-social-ads",
                question:
                    "Does Flame Japanese Hibachi run targeted ads on social media?",
                answer: [
                    {
                        type: "paragraph",
                        content: `We do use the Meta Pixel on our website to help measure the effectiveness of our Facebook and Instagram advertising. This means that if you visit our site, you may later see Flame Japanese Hibachi ads on those platforms. You can control these preferences through your Facebook ad settings or by opting out as described above.`,
                    },
                ],
            },
        ],
    },

    {
        type: "default",
        title: "Your Privacy Rights",
        items: [
            {
                id: "request-copy-delete",
                question:
                    "Can I request a copy of my personal information or ask for it to be deleted?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Yes. Depending on your state of residence, you may have the right to know what personal information we hold about you, correct inaccurate information, or request deletion. To make a request, email us at ask@flamejapanesehibachi.com with "Privacy Request" in the subject line, or call +1 888-786-5411. We will respond within 45 days. Note: requests related to order history or payment data should be directed to DoorDash, as we do not hold that information.`,
                    },
                ],
            },
            {
                id: "california-ccpa-rights",
                question: "I'm a California resident. What are my rights under the CCPA?",
                answer: [
                    {
                        type: "paragraph",
                        content: `California residents have the right to know what personal information we've collected, delete that information, correct inaccuracies, opt out of the sale or sharing of their data, and be free from discrimination for exercising these rights. We do not sell your data. For cross-context advertising (e.g., Meta Pixel), you can opt out through your browser settings or Meta's ad preferences. To submit a verifiable request under the CCPA, contact us at ask@flamejapanesehibachi.com.`,
                    },
                ],
            },
            {
                id: "virginia-vcdpa-rights",
                question: "I'm a Virginia resident. Do I have any privacy rights?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Yes. Under the Virginia Consumer Data Protection Act (VCDPA), you have the right to access, correct, delete, and receive a portable copy of your personal data. You also have the right to opt out of targeted advertising. To exercise any of these rights, please contact us at ask@flamejapanesehibachi.com.`,
                    },
                ],
            },
            {
                id: "marketing-opt-out",
                question: "How do I opt out of marketing emails or promotional messages?",
                answer: [
                    {
                        type: "paragraph",
                        content: `If you've signed up to receive promotional emails from us, you can unsubscribe at any time by clicking the "Unsubscribe" link at the bottom of any marketing email. You can also email us at ask@flamejapanesehibachi.com and request removal from our mailing list. Please allow up to 10 business days to process your request.`,
                    },
                ],
            },
        ],
    },

    {
        type: "default",
        title: "Our Food, Halal & Sauces",
        items: [
            {
                id: "halal-meat",
                question: "Is the meat served at Flame Japanese Hibachi Halal?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Yes. The meat we serve at Flame Japanese Hibachi is 100% Halal. We are committed to sourcing and preparing our proteins in accordance with Halal standards so that our guests can dine with confidence. If you have questions about a specific menu item or location, please contact us at ask@flamejapanesehibachi.com or call +1 888-786-5411.`,
                    },
                ],
            },
            {
                id: "fresh-food",
                question: "Is the food made fresh, or is it pre-prepared?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Every plate is cooked fresh when you order. We do not pre-cook and hold your meal—your food is prepared to order so it arrives hot, flavorful, and at its best. Because each dish is made fresh, preparation times may vary slightly during busy periods, and we appreciate your patience while we cook your order just right.`,
                    },
                ],
            },
            {
                id: "sauces",
                question: "Do your dishes come with sauces?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Absolutely. Every food item is paired with our in-house sauces, crafted to complement each dish and bring out the signature Flame flavor. If you have a sauce preference or a dietary restriction, let us know when you order and we’ll do our best to accommodate you.`,
                    },
                ],
            },
        ],
    },

    {
        type: "default",
        title: "Catering & Large Orders",
        items: [
            {
                id: "catering-available",
                question: "Does Flame Japanese Hibachi offer catering?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Yes! Whether you’re feeding a small gathering or planning a feast for a large group, we’d love to cook for your event. Catering and large-group orders are arranged directly with our team rather than through the DoorDash platform. To get started, simply contact our customer support at ask@flamejapanesehibachi.com or call +1 888-786-5411, and we’ll help you build the perfect menu.`,
                    },
                ],
            },
            {
                id: "place-catering-order",
                question: "How do I place a catering or large-group order?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Catering and large orders are handled directly by our team, not through online checkout. Reach out to our customer support by emailing ask@flamejapanesehibachi.com or calling +1 888-786-5411. To help us serve you best, please share the date and time of your event, the number of guests, your preferred location, and any menu items you have in mind. We’ll confirm availability, pricing, and pickup or delivery details with you.`,
                    },
                ],
            },
            {
                id: "custom-event-request",
                question:
                    "Can I make a special request or customize a feast for a big event?",
                answer: [
                    {
                        type: "paragraph",
                        content: `Of course. If you have a special request—a custom spread, specific dishes, dietary considerations, or a feast for a large crowd—our team is happy to work with you. Just contact our customer support at ask@flamejapanesehibachi.com or +1 888-786-5411 with the details of your event, and we’ll tailor an order to fit your occasion.`,
                    },
                ],
            },
        ],
    },

    {
        type: "default",
        title: "Loyalty Programs & Subscriptions",
        items: [
            {
                id: "loyalty-program",
                question:
                    "Does Flame Japanese Hibachi have a loyalty or rewards program?",
                answer: [
                    {
                        type: "paragraph",
                        content: `At this time, Flame Japanese Hibachi does not operate a standalone loyalty or rewards program on our website. Any rewards, promotions, or offers available through DoorDash are managed by DoorDash under their own terms and privacy practices. Follow our social media pages and check our website for updates on future programs.`,
                    },
                ],
            },
            {
                id: "future-loyalty-data-use",
                question: "If you launch a loyalty program, how will my data be used?",
                answer: [
                    {
                        type: "paragraph",
                        content: `If and when we launch a loyalty program, we will clearly explain what data is collected, how it is used, and how you can opt out—prior to enrollment. We will update this FAQ and our Privacy Policy accordingly. We will never enroll you in any program without your explicit consent.`,
                    },
                ],
            },
        ],
    },

    {
        type: "default",
        title: "Contact & Support",
        items: [
            {
                id: "privacy-contact",
                question:
                    "How do I contact Flame Japanese Hibachi with a privacy concern?",
                answer: [
                    {
                        type: "paragraph",
                        content: `You can reach our team through any of the following channels. Please reference "Privacy Inquiry" in your message so we can route it to the right person.`,
                    },
                    {
                        type: "list",
                        items: [
                            "Email: ask@flamejapanesehibachi.com",
                            "Phone: +1 888-786-5411 (Office) | +1 786-200-3917 (Cell)",
                            "Website: www.flamehibachi.com/contact",
                            "Mail: 5411c Backlick Rd, Springfield, VA 22151, USA",
                        ],
                    },
                    {
                        type: "paragraph",
                        content:
                            "Office hours: Monday – Saturday, 9:00 AM – 5:00 PM ET. We aim to respond to all privacy inquiries within 10 business days.",
                    },
                ],
            },
        ],
    },
];