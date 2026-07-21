import type { AccordionRendererSection } from "@/components/Accordion/AccordionRenderer";

export const privacyPolicySections: AccordionRendererSection[] = [
    {
        type: "default",
        title: "PRIVACY POLICY",
        items: [
            {
                id: "who-we-are",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `At Flame Japanese Hibachi ("Flame," "we," "us," or "our"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, who we share it with, and the choices you have regarding your data.`
                    },
                    {
                        type: "paragraph",
                        content: `This Policy applies to our website at www.flamehibachi.com and any related digital services we operate. It does not apply to third-party platforms—such as DoorDash—which operate under their own privacy policies.`
                    },
                    {
                        type: "paragraph",
                        content: `By using our website, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue use of our site.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "WHO WE ARE",
        items: [
            {
                id: "who-we-are-details",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `Flame Japanese Hibachi is a fast-casual hibachi restaurant chain operating across multiple locations in Maryland, Virginia, Pennsylvania, and Florida. Our corporate office is located at:`
                    },
                    {
                        type: "paragraph",
                        content: `5411c Backlick Rd, Springfield, VA 22151, USA\nEmail: ask@flamejapanesehibachi.com   |   Phone: +1 888-786-5411`
                    },
                    {
                        type: "paragraph",
                        content: `For privacy-specific inquiries, you may use the contact details above and reference "Privacy Inquiry" in your subject line.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "INFORMATION WE COLLECT",
        items: [
            {
                id: "information-we-collect",
                question: "",
                answer: [
                    {
                        type: "subheading",
                        content: "2.1 Information You Provide Directly"
                    },
                    {
                        type: "paragraph",
                        content: `When you contact us through our website's contact form, email, or phone, we may collect:`
                    },
                    {
                        type: "list",
                        items: [
                            "Your full name",
                            "Email address",
                            "Phone number",
                            "The content of your message or inquiry"
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `We do not operate our own online ordering system. All food orders are processed through DoorDash (see Section 5 for details).`
                    },
                    {
                        type: "subheading",
                        content: "2.2 Information Collected Automatically"
                    },
                    {
                        type: "paragraph",
                        content: `When you visit our website, we and our analytics partners automatically collect certain technical and behavioral information, including:`
                    },
                    {
                        type: "list",
                        items: [
                            "IP address and approximate geographic location (city/region level)",
                            "Browser type and version",
                            "Device type and operating system",
                            "Pages visited, time spent on each page, and navigation paths",
                            "Referral source (how you arrived at our site)",
                            "Date and time of your visit"
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `This information is collected using cookies, web beacons, and similar tracking technologies (see Section 9 for our Cookie Policy).`
                    },
                    {
                        type: "subheading",
                        content: "2.3 Information from Third-Party Tools"
                    },
                    {
                        type: "paragraph",
                        content: `We use the following third-party tools that may collect information about your interactions with our website:`
                    },
                    {
                        type: "list",
                        items: [
                            "Google Tag Manager & Google Analytics: Used to understand how visitors interact with our website, including page views, session duration, and conversion events.",
                            "Meta Pixel (Facebook Pixel): Used to measure the effectiveness of our advertising campaigns on Facebook and Instagram, and to serve you relevant ads on those platforms.",
                            "Google Maps: Embedded maps on our locations page may collect your IP address and location data according to Google's Privacy Policy.",
                            "Social Media Platforms: If you click through to our Facebook, Instagram, or YouTube pages, those platforms collect data according to their own privacy policies."
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `Important: Flame Japanese Hibachi does not collect your payment information, delivery address, or order history directly. All such data is collected and managed by DoorDash when you place an order through their platform.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "HOW WE USE YOUR INFORMATION",
        items: [
            {
                id: "how-we-use-your-information",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `We use the information we collect for the following purposes:`
                    },
                    {
                        type: "list",
                        items: [
                            "To respond to your questions, feedback, or contact inquiries",
                            "To improve our website's content, layout, and user experience",
                            "To understand which menu items, promotions, and locations attract the most interest",
                            "To measure the performance of our advertising campaigns",
                            "To send you promotional communications if you have opted in (e.g., email newsletters or social media ads)",
                            "To comply with applicable legal obligations",
                            "To detect and prevent fraud or misuse of our website"
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `We do not sell your personal information. We do not use your data for automated decision-making or profiling that produces legal or similarly significant effects.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "LEGAL BASES FOR PROCESSING (GDPR)",
        items: [
            {
                id: "legal-bases",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `If you are located in the European Economic Area (EEA) or the United Kingdom, we process your personal information under the following legal bases:`
                    },
                    {
                        type: "list",
                        items: [
                            "Consent: When you voluntarily submit a contact form or opt in to marketing communications.",
                            "Legitimate Interests: When we analyze website traffic and improve our services, provided those interests are not overridden by your data protection rights.",
                            "Legal Obligation: When we are required to retain or disclose information to comply with applicable law."
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "DOORDASH INTEGRATION & THIRD-PARTY ORDERING",
        items: [
            {
                id: "doordash-integration",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `Our website links customers to DoorDash (order.online) to place food orders. When you click "Order Now" and proceed through DoorDash's platform, you are subject to DoorDash's Privacy Policy and Terms of Service—not this Policy.`
                    },
                    {
                        type: "paragraph",
                        content: `Data collected by DoorDash during ordering—including your name, delivery address, phone number, email address, and payment card details—is governed entirely by DoorDash.`
                    },
                    {
                        type: "paragraph",
                        content: `Flame Japanese Hibachi may receive limited order-related information from DoorDash (such as the items ordered and order status) for the purpose of preparing your food. We do not receive or store your full payment information.`
                    },
                    {
                        type: "paragraph",
                        content: `We encourage you to review DoorDash's Privacy Policy at: https://www.doordash.com/privacy/`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "SHARING YOUR INFORMATION",
        items: [
            {
                id: "sharing-your-information",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `We do not sell, rent, or trade your personal information. We may share your information in the following limited circumstances:`
                    },
                    {
                        type: "subheading",
                        content: "Service Providers"
                    },
                    {
                        type: "paragraph",
                        content: `We share data with trusted vendors who assist in operating our website and digital services, including Google (analytics and tag management), Meta (advertising), and our web hosting provider. These vendors are contractually required to use your data only as directed by us.`
                    },
                    {
                        type: "subheading",
                        content: "DoorDash"
                    },
                    {
                        type: "paragraph",
                        content: `As described in Section 5, clicking through to DoorDash transfers you to their platform and their data practices apply.`
                    },
                    {
                        type: "subheading",
                        content: "Legal Requirements"
                    },
                    {
                        type: "paragraph",
                        content: `We may disclose your information if required to do so by law, court order, or governmental authority, or if we reasonably believe disclosure is necessary to protect our rights, prevent fraud, or protect the safety of users or the public.`
                    },
                    {
                        type: "subheading",
                        content: "Business Transfers"
                    },
                    {
                        type: "paragraph",
                        content: `If Flame Japanese Hibachi is acquired, merges with another entity, or undergoes a restructuring, your information may be transferred as part of that transaction. We will notify you of any such change via a notice on our website.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "DATA RETENTION",
        items: [
            {
                id: "data-retention",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `We retain personal information only for as long as necessary to fulfill the purposes described in this Policy, or as required by law:`
                    },
                    {
                        type: "list",
                        items: [
                            "Contact form submissions: Retained for up to 24 months from the date of submission.",
                            "Website analytics data: Retained in aggregated or anonymized form for up to 26 months, consistent with Google Analytics default settings.",
                            "Advertising data (Meta Pixel): Retained per Meta's data policies; typically 180 days for event matching."
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `When data is no longer needed, we delete or anonymize it securely.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "DATA SECURITY",
        items: [
            {
                id: "data-security",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `We implement reasonable technical and organizational measures to protect your information against unauthorized access, disclosure, alteration, or destruction. These include:`
                    },
                    {
                        type: "list",
                        items: [
                            "HTTPS encryption for all data transmitted through our website",
                            "Access controls limiting who within our organization can access contact data",
                            "Use of reputable, security-certified third-party platforms"
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security. If you believe your information has been compromised, please contact us immediately at ask@flamejapanesehibachi.com.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "COOKIE POLICY",
        items: [
            {
                id: "cookie-policy",
                question: "",
                answer: [
                    {
                        type: "subheading",
                        content: "What Are Cookies?"
                    },
                    {
                        type: "paragraph",
                        content: `Cookies are small text files placed on your device when you visit a website. They help us recognize your device, remember your preferences, and understand how you use our site.`
                    },
                    {
                        type: "subheading",
                        content: "Types of Cookies We Use"
                    },
                    {
                        type: "list",
                        items: [
                            "Essential Cookies: Necessary for the website to function properly (e.g., maintaining page session state). These cannot be disabled.",
                            "Analytics Cookies: Used by Google Analytics and Google Tag Manager to collect information about how visitors use our site, such as which pages are visited most often. Data is aggregated and anonymized.",
                            "Advertising & Tracking Cookies: Used by the Meta Pixel to measure the effectiveness of our Facebook and Instagram ads and to show you relevant advertising on those platforms."
                        ]
                    },
                    {
                        type: "subheading",
                        content: "Managing Your Cookie Preferences"
                    },
                    {
                        type: "paragraph",
                        content: `You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Please note that disabling certain cookies may affect the functionality of our website.`
                    },
                    {
                        type: "paragraph",
                        content: `You may also opt out of analytics and advertising tracking through the following tools:`
                    },
                    {
                        type: "list",
                        items: [
                            "Google Analytics Opt-Out: Install the Google Analytics Opt-Out Browser Add-on at tools.google.com/dlpage/gaoptout",
                            "Meta Ad Preferences: Manage your ad preferences at facebook.com/ads/preferences",
                            "Network Advertising Initiative: Visit optout.networkadvertising.org"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "YOUR PRIVACY RIGHTS",
        items: [
            {
                id: "your-privacy-rights",
                question: "",
                answer: [
                    {
                        type: "subheading",
                        content: "California Residents (CCPA / CPRA)"
                    },
                    {
                        type: "paragraph",
                        content: `If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA):`
                    },
                    {
                        type: "list",
                        items: [
                            "Right to Know: You may request disclosure of the categories and specific pieces of personal information we have collected about you.",
                            "Right to Delete: You may request deletion of your personal information, subject to certain exceptions.",
                            "Right to Correct: You may request correction of inaccurate personal information.",
                            "Right to Opt Out of Sale/Sharing: We do not sell personal information. However, our use of Meta Pixel and Google Analytics may constitute \"sharing\" under the CPRA for cross-context behavioral advertising. You may opt out as described in Section 9.",
                            "Right to Non-Discrimination: We will not discriminate against you for exercising any of your privacy rights."
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `To submit a verifiable consumer request, contact us at ask@flamejapanesehibachi.com or call +1 888-786-5411. We will respond within 45 days as required by law.`
                    },
                    {
                        type: "subheading",
                        content: "Virginia Residents (VCDPA)"
                    },
                    {
                        type: "paragraph",
                        content: `If you are a Virginia resident, the Virginia Consumer Data Protection Act (VCDPA) grants you rights to access, correct, delete, and obtain a portable copy of your personal data. You also have the right to opt out of targeted advertising. To exercise these rights, contact us at ask@flamejapanesehibachi.com.`
                    },
                    {
                        type: "subheading",
                        content: "Maryland, Pennsylvania, and Florida Residents"
                    },
                    {
                        type: "paragraph",
                        content: `Residents of Maryland, Pennsylvania, and Florida may also have state-specific rights regarding their personal information. We honor all applicable state privacy laws in the jurisdictions where we operate. Contact us to learn more about your specific rights.`
                    },
                    {
                        type: "subheading",
                        content: "EEA and UK Residents (GDPR / UK GDPR)"
                    },
                    {
                        type: "paragraph",
                        content: `You have the right to access, rectify, erase, restrict processing of, and port your personal data. You also have the right to object to processing and to withdraw consent at any time (without affecting the lawfulness of processing before withdrawal). You have the right to lodge a complaint with your local supervisory authority.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "CHILDREN'S PRIVACY",
        items: [
            {
                id: "childrens-privacy",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected such information, we will delete it promptly. If you believe a child has provided us with personal information, please contact us at ask@flamejapanesehibachi.com.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "LINKS TO THIRD-PARTY SITES",
        items: [
            {
                id: "links-to-third-party-sites",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `Our website contains links to third-party websites, including DoorDash, our social media pages (Facebook, Instagram, YouTube), and others. These sites have their own privacy policies, which we encourage you to review. We are not responsible for the privacy practices of any third-party site.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "CHANGES TO THIS PRIVACY POLICY",
        items: [
            {
                id: "changes-to-privacy-policy",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or applicable law. When we make material changes, we will post the updated Policy on this page with a revised "Last Updated" date. We encourage you to review this Policy periodically.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "CONTACT US — PRIVACY INQUIRIES",
        items: [
            {
                id: "contact-us",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `For any privacy-related questions, requests, or concerns, please contact us at:`
                    },
                    {
                        type: "list",
                        items: [
                            "Email: ask@flamejapanesehibachi.com",
                            "Phone: +1 888-786-5411",
                            "Mail: Flame Japanese Hibachi, 5411c Backlick Rd, Springfield, VA 22151, USA"
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `We aim to respond to all privacy inquiries within 10 business days.`
                    }
                ]
            }
        ]
    }
];