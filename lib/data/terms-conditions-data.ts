import type { AccordionRendererSection } from "@/components/Accordion/AccordionRenderer";

export const termsConditionsSections: AccordionRendererSection[] = [
    {
        type: "default",
        title: "ACCEPTANCE OF TERMS & ELIGIBILITY",
        items: [
            {
                id: "acceptance-of-terms",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `These Terms constitute a legally binding agreement between you and Flame. They apply to all visitors, users, and others who access or use the Site.`
                    },
                    {
                        type: "paragraph",
                        content: `By using the Site, you represent and warrant that you are at least 18 years of age, or that you are accessing the Site under the supervision of a parent or legal guardian who agrees to be bound by these Terms. The Site is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If you are between 13 and 18, you may use the Site only with the involvement and consent of a parent or guardian.`
                    },
                    {
                        type: "paragraph",
                        content: `If you are using the Site on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "CHANGES TO THESE TERMS",
        items: [
            {
                id: "changes-to-terms",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `We may revise these Terms from time to time to reflect changes in our practices, our menu and services, applicable law, or for other operational, legal, or regulatory reasons. When we make material changes, we will post the updated Terms on this page and revise the "Last Updated" date above.`
                    },
                    {
                        type: "paragraph",
                        content: `Your continued use of the Site after any changes take effect constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically. If you do not agree to the revised Terms, you should stop using the Site.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "USE OF THE SITE & USER CONDUCT",
        items: [
            {
                id: "use-of-site",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Site for your personal, non-commercial purposes - such as browsing our menu, locating our restaurants, learning about our offerings, and contacting us - in accordance with these Terms.`
                    },
                    {
                        type: "paragraph",
                        content: `You agree that you will NOT:`
                    },
                    {
                        type: "list",
                        items: [
                            "Use the Site for any unlawful, fraudulent, or unauthorized purpose, or in violation of any applicable local, state, federal, or international law or regulation;",
                            "Submit false, misleading, or deceptive information through any contact form, feedback field, or other interactive feature;",
                            "Attempt to gain unauthorized access to any portion of the Site, our servers, or any systems or networks connected to the Site;",
                            "Introduce viruses, malware, or other malicious or harmful code, or otherwise interfere with or disrupt the integrity or performance of the Site;",
                            "Use any robot, spider, scraper, or other automated means to access, monitor, or copy the Site or its content without our prior written permission;",
                            "Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Site or its content without our express written permission;",
                            "Harass, abuse, threaten, or harm another person, or post or transmit any content that is defamatory, obscene, hateful, or otherwise objectionable;",
                            "Impersonate Flame, our employees, or any other person or entity, or misrepresent your affiliation with any person or entity;",
                            "Circumvent, disable, or otherwise interfere with security-related features of the Site."
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `We reserve the right, at our sole discretion, to restrict, suspend, or terminate your access to all or part of the Site, without notice, if we believe you have violated these Terms or engaged in conduct that we deem inappropriate or harmful.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "ONLINE ORDERING & THIRD-PARTY PLATFORMS (DOORDASH)",
        items: [
            {
                id: "online-ordering",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `Flame does not operate its own online ordering or payment system. All online food orders are placed and processed through DoorDash, an independent third-party platform. When you click "Order Now" or a similar link on the Site, you will be redirected away from our Site to DoorDash's platform (order.online).`
                    },
                    {
                        type: "subheading",
                        content: `THIRD-PARTY ORDERING DISCLAIMER`
                    },
                    {
                        type: "paragraph",
                        content: `Once you leave our Site and enter the DoorDash platform, your transaction is governed entirely by DoorDash's own Terms of Service and Privacy Policy - not by these Terms. DoorDash is solely responsible for processing payments, collecting delivery and contact information, dispatching delivery drivers, and handling order fulfillment through its platform.`
                    },
                    {
                        type: "paragraph",
                        content: `Because DoorDash is an independent company and not an agent, partner, or employee of Flame, you acknowledge and agree that:`
                    },
                    {
                        type: "list",
                        items: [
                            "Flame does not collect, receive, or store your full payment card details, billing information, or delivery address. This information is handled by DoorDash. We may receive limited order-related information (such as items ordered and order status) for the sole purpose of preparing your food.",
                            "Pricing, fees, service charges, delivery charges, tips, taxes, promotions, and availability shown on the DoorDash platform are set and controlled in whole or in part by DoorDash and may differ from in-store prices.",
                            "Delivery times, driver conduct, order tracking, refunds, cancellations, and delivery-related issues are managed by DoorDash. Flame does not control and is not responsible for the acts or omissions of DoorDash or its delivery drivers.",
                            "For any issue relating to a delivery order - including missing items, incorrect orders, late delivery, or payment disputes - you should contact DoorDash directly through the DoorDash app, or contact the specific restaurant location that prepared your order."
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `To the fullest extent permitted by law, Flame disclaims all liability arising from or relating to your use of the DoorDash platform or any transaction conducted through it. We encourage you to review DoorDash's Privacy Policy at https://www.doordash.com/privacy/ and DoorDash's terms before placing an order.`
                    },
                    {
                        type: "paragraph",
                        content: `Our linking to DoorDash does not constitute an endorsement of, or responsibility for, that platform. Section 11 (Links to Third-Party Sites) applies to all third-party links on the Site.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "MENU, PRICING & PRODUCT AVAILABILITY",
        items: [
            {
                id: "menu-pricing",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `Our Site showcases our menu offerings, which may include Hibachi, the Flame Combo, Sushi, Bento boxes, Boba Tea, Smoothies, and Flame-Loaded Fries, among other items. Menu items, ingredients, descriptions, images, and prices are provided for general informational purposes only and are subject to change without notice.`
                    },
                    {
                        type: "paragraph",
                        content: `Menu availability, pricing, and specific offerings vary by location and may differ from what is displayed on the Site or on the DoorDash platform. Product images are for illustration only and may not reflect the exact appearance, portion size, or preparation of items served. We make reasonable efforts to keep the information on our Site accurate and current but do not warrant that menu descriptions, pricing, or other Site content is complete, reliable, error-free, or up to date at all times.`
                    },
                    {
                        type: "paragraph",
                        content: `In the event of a pricing discrepancy between our Site and the actual price charged at a restaurant or on DoorDash, the price charged at the point of sale will govern.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "ALLERGEN & FOOD SAFETY DISCLOSURES",
        items: [
            {
                id: "allergen-safety",
                question: "",
                answer: [
                    {
                        type: "subheading",
                        content: `IMPORTANT ALLERGEN NOTICE`
                    },
                    {
                        type: "paragraph",
                        content: `Our food is prepared in kitchens that handle common allergens - including but not limited to soy, wheat/gluten, eggs, fish, shellfish, tree nuts, peanuts, sesame, and dairy. We cannot guarantee that any menu item is free from any specific allergen, and cross-contact between ingredients may occur during preparation and cooking.`
                    },
                    {
                        type: "paragraph",
                        content: `If you have a food allergy, intolerance, or other dietary restriction, please inform restaurant staff before ordering and exercise your own judgment. Customers with severe allergies should be aware that we cannot guarantee an allergen-free environment.`
                    },
                    {
                        type: "paragraph",
                        content: `Allergen and nutritional information provided on the Site, if any, is general in nature and may not reflect recipe variations, regional ingredient differences, supplier changes, or preparation practices at individual locations. The information is not a substitute for professional medical or dietary advice.`
                    },
                    {
                        type: "paragraph",
                        content: `Raw or undercooked notice: Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness, especially if you have certain medical conditions. Items such as sushi may contain raw fish.`
                    },
                    {
                        type: "paragraph",
                        content: `To the fullest extent permitted by law, Flame is not liable for any allergic reaction, illness, injury, or adverse effect arising from the consumption of, or contact with, our food products. By ordering or consuming our food, you acknowledge and assume these risks.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "INTELLECTUAL PROPERTY RIGHTS",
        items: [
            {
                id: "intellectual-property",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `All content on the Site - including the "Flame Japanese Hibachi" name, logos, trademarks, service marks, trade dress, menu names and descriptions, text, graphics, photographs, images, illustrations, page layouts, design elements, and the selection and arrangement thereof (collectively, the "Content") - is owned by or licensed to Flame and is protected by United States and international copyright, trademark, and other intellectual property laws.`
                    },
                    {
                        type: "paragraph",
                        content: `We grant you no right, title, or interest in the Content other than the limited license to view it for your personal, non-commercial use as described in Section 3. You may not copy, reproduce, republish, upload, post, transmit, distribute, modify, create derivative works from, publicly display, or otherwise exploit any Content without our prior written permission.`
                    },
                    {
                        type: "paragraph",
                        content: `The trademarks, logos, and brand names of third parties that appear on the Site (including DoorDash, Google, and Meta) are the property of their respective owners and are used for identification purposes only. Their appearance does not imply any affiliation with or endorsement by those parties.`
                    },
                    {
                        type: "paragraph",
                        content: `If you submit any feedback, suggestions, reviews, or ideas to us ("Submissions"), you grant Flame a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, and display such Submissions for any purpose, without compensation or attribution to you.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "DISCLAIMERS OF WARRANTIES",
        items: [
            {
                id: "disclaimers",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `THE SITE AND ALL CONTENT, MATERIALS, AND INFORMATION ON IT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED.`
                    },
                    {
                        type: "paragraph",
                        content: `To the fullest extent permitted by applicable law, Flame disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant that:`
                    },
                    {
                        type: "list",
                        items: [
                            "The Site will be uninterrupted, timely, secure, or error-free;",
                            "The information on the Site (including menu items, pricing, and location details) is accurate, complete, reliable, or current;",
                            "The Site or the servers that make it available are free of viruses or other harmful components;",
                            "Any defects or errors in the Site will be corrected."
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `You use the Site and rely on any Content at your own risk. Some jurisdictions do not allow the exclusion of certain warranties, so some of the above exclusions may not apply to you.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "LIMITATION OF LIABILITY",
        items: [
            {
                id: "limitation-liability",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FLAME, ITS OWNERS, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES - INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES - ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE SITE.`
                    },
                    {
                        type: "paragraph",
                        content: `This limitation applies regardless of the legal theory on which the claim is based (whether contract, tort, negligence, strict liability, or otherwise) and even if Flame has been advised of the possibility of such damages.`
                    },
                    {
                        type: "paragraph",
                        content: `Without limiting the foregoing, Flame shall not be liable for any damages arising from: (a) your use of, or reliance on, any third-party platform, including DoorDash; (b) any food order placed through a third party; (c) errors, inaccuracies, or omissions in Site content; (d) any interruption or cessation of the Site; or (e) any unauthorized access to or alteration of your transmissions or data.`
                    },
                    {
                        type: "paragraph",
                        content: `To the fullest extent permitted by law, the total aggregate liability of Flame for any and all claims arising out of or relating to these Terms or your use of the Site shall not exceed one hundred U.S. dollars (US$100.00).`
                    },
                    {
                        type: "paragraph",
                        content: `Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages, so the above limitations may not apply to you in full. Nothing in these Terms limits any liability that cannot be limited under applicable law.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "INDEMNIFICATION",
        items: [
            {
                id: "indemnification",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `You agree to indemnify, defend, and hold harmless Flame and its owners, officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) your use or misuse of the Site; (b) your violation of these Terms; (c) your violation of any applicable law or the rights of any third party; or (d) any content or information you submit through the Site.`
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
                id: "links-third-party",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `The Site contains links to third-party websites and services, including DoorDash, our social media pages (such as Facebook, Instagram, and YouTube), mapping services, and others. These links are provided for your convenience only.`
                    },
                    {
                        type: "paragraph",
                        content: `We do not control, endorse, or assume responsibility for the content, privacy policies, terms, or practices of any third-party website or service. Accessing any linked third-party site is done at your own risk, and you should review the applicable terms and privacy policies of those sites. Our Privacy Policy does not apply to information collected by third parties.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "PRIVACY & COOKIE NOTICE",
        items: [
            {
                id: "privacy-cookie",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `Your use of the Site is also governed by our Privacy Policy, which describes how we collect, use, and protect your information and is incorporated into these Terms by reference. You can review it at www.flamehibachi.com/privacy-policy.`
                    },
                    {
                        type: "paragraph",
                        content: `Our Site uses cookies and similar tracking technologies - including essential cookies, analytics cookies (Google Analytics and Google Tag Manager), and advertising cookies (Meta Pixel) - to operate the Site, understand visitor behavior, and measure advertising performance. By using the Site, you consent to our use of cookies as described in our Privacy Policy.`
                    },
                    {
                        type: "paragraph",
                        content: `You can control or disable cookies through your browser settings and opt out of certain analytics and advertising tracking. Please note that disabling certain cookies may affect how parts of the Site function. For full details, including opt-out tools and your privacy rights, please refer to the Cookie Policy section of our Privacy Policy.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "GOVERNING LAW & JURISDICTION",
        items: [
            {
                id: "governing-law",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `Flame operates restaurant locations in Maryland, Virginia, Pennsylvania, and Florida. These Terms and any dispute arising out of or relating to these Terms or your use of the Site shall be governed by and construed in accordance with the laws of the Commonwealth of Virginia, where our corporate office is located, without regard to its conflict-of-laws principles.`
                    },
                    {
                        type: "paragraph",
                        content: `Subject to the dispute resolution provisions in Section 14, you agree that any legal action or proceeding arising out of or relating to these Terms or the Site shall be brought exclusively in the state or federal courts located in Fairfax County, Virginia, and you consent to the personal jurisdiction and venue of those courts.`
                    },
                    {
                        type: "paragraph",
                        content: `Where you interact with a specific restaurant location, certain matters - such as in-store conduct, local consumer protection statutes, and food-safety regulations - may also be subject to the laws of the state in which that location operates (Maryland, Virginia, Pennsylvania, or Florida). Nothing in these Terms deprives you of the protection of any mandatory consumer-protection laws of the state in which you reside.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "DISPUTE RESOLUTION",
        items: [
            {
                id: "dispute-resolution",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `We want to resolve any concerns quickly and fairly. The following process applies to disputes between you and Flame arising out of or relating to these Terms or the Site.`
                    },
                    {
                        type: "subheading",
                        content: `14.1 Informal Resolution.`
                    },
                    {
                        type: "paragraph",
                        content: `Before filing any formal claim, you agree to first contact us at daiyan05@yahoo.com and provide a brief written description of your concern. We will attempt in good faith to resolve the matter informally within thirty (30) days of receiving your notice. Most concerns can be resolved this way.`
                    },
                    {
                        type: "subheading",
                        content: `14.2 Order-Related Disputes.`
                    },
                    {
                        type: "paragraph",
                        content: `Disputes concerning a food order placed through DoorDash - including payment, refunds, delivery, or order accuracy - must be directed to DoorDash and are subject to DoorDash's dispute resolution procedures, not these Terms.`
                    },
                    {
                        type: "subheading",
                        content: `14.3 Binding Resolution.`
                    },
                    {
                        type: "paragraph",
                        content: `If a dispute cannot be resolved informally, it shall be resolved through the courts identified in Section 13, unless both parties agree in writing to an alternative method such as mediation or arbitration. Any claim must be brought on an individual basis and not as a plaintiff or class member in any purported class or representative proceeding, to the extent permitted by applicable law.`
                    },
                    {
                        type: "subheading",
                        content: `14.4 Time Limit.`
                    },
                    {
                        type: "paragraph",
                        content: `To the extent permitted by applicable law, any claim arising out of or relating to these Terms or the Site must be filed within one (1) year after the claim arose; otherwise, the claim is permanently barred.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "MODIFICATION & TERMINATION OF THE SITE",
        items: [
            {
                id: "modification-termination",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `We reserve the right, at any time and without notice, to modify, suspend, or discontinue the Site (or any part or feature of it), temporarily or permanently. We may also restrict or terminate your access to the Site at our sole discretion, including if we believe you have violated these Terms.`
                    },
                    {
                        type: "paragraph",
                        content: `We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Site. Provisions that by their nature should survive termination - including intellectual property rights, disclaimers, limitations of liability, indemnification, and governing law - shall survive.`
                    },
                    {
                        type: "paragraph",
                        content: `Upon termination of your access, your right to use the Site immediately ceases, but these Terms will continue to apply to your prior use.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "GENERAL PROVISIONS",
        items: [
            {
                id: "general-provisions",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `Entire Agreement. These Terms, together with our Privacy Policy, constitute the entire agreement between you and Flame regarding your use of the Site and supersede any prior agreements.`
                    },
                    {
                        type: "paragraph",
                        content: `Severability. If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.`
                    },
                    {
                        type: "paragraph",
                        content: `No Waiver. Our failure to enforce any right or provision of these Terms will not be considered a waiver of that right or provision.`
                    },
                    {
                        type: "paragraph",
                        content: `Assignment. You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations under these Terms without restriction, including in connection with a merger, acquisition, or sale of assets.`
                    },
                    {
                        type: "paragraph",
                        content: `Force Majeure. Flame is not liable for any failure or delay in performance resulting from causes beyond our reasonable control, including natural disasters, supply shortages, labor disruptions, utility or internet outages, or government action.`
                    },
                    {
                        type: "paragraph",
                        content: `Headings. Section headings are provided for convenience only and do not affect the interpretation of these Terms.`
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "OUR LOCATIONS",
        items: [
            {
                id: "our-locations",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `Flame Japanese Hibachi currently operates the following locations across Maryland, Virginia, Pennsylvania, and Florida, with new locations opening over time:`
                    },
                    {
                        type: "table",
                        headers: ["Location", "Address"],
                        rows: [
                            ["Baltimore, MD", "5230 Moravia Rd, Suite B"],
                            ["Baltimore, MD", "4460 W Northern Parkway"],
                            ["Manassas, VA", "9522 Liberia Ave"],
                            ["Laurel, MD", "13600 Baltimore Ave #310"],
                            ["Pasadena, MD", "8036 Ritchie Hwy, Suite 1-C"],
                            ["Alexandria, VA", "6676 Richmond Hwy"],
                            ["Richmond / Forest Hill, VA", "7037 Forest Hill Avenue, Suite B"],
                            ["Tamarac, FL", "5707 University Dr"],
                            ["Seven Corners, VA", "6379 Seven Corners Center"],
                            ["Philadelphia, PA", "101 E Olney Avenue"],
                            ["Royal Palm Beach, FL", "9940 Belvedere Rd #F"],
                            ["Aberdeen, MD", "939 Beards Hill Rd"]
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "default",
        title: "CONTACT US",
        items: [
            {
                id: "contact-us",
                question: "",
                answer: [
                    {
                        type: "paragraph",
                        content: `If you have questions about these Terms & Conditions, please contact us:`
                    },
                    {
                        type: "list",
                        items: [
                            "Email: daiyan05@yahoo.com",
                            "Phone: +1 888-786-5411",
                            "Website: www.flamehibachi.com/contact",
                            "Mail: Flame Japanese Hibachi, 5411C Backlick road, Springfield, VA 22151, USA"
                        ]
                    },
                    {
                        type: "paragraph",
                        content: `Office hours: Monday – Saturday, 9:00 AM – 5:00 PM ET. We aim to respond to all inquiries within 10 business days.`
                    },
                    {
                        type: "paragraph",
                        content: `By using the Flame Japanese Hibachi website, you acknowledge that you have read and agree to these Terms & Conditions.`
                    }
                ]
            }
        ]
    }
];
