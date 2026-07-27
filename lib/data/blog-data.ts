import type { BlogPost } from "@/lib/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "simple-ways-to-turn-everyday-meals-into-something-special",
    category: "Food & Lifestyle",
    title: "Simple Ways to Turn Everyday Meals Into Something Special",
    excerpt:
      "Great food does not always require complicated recipes or expensive ingredients. With a little planning, fresh flavors, and thoughtful presentation, ordinary meals can become memorable dining experiences.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "6 min read",
    featuredImage: "/menupage/hibachi/chicken-hibachi-plate.jpg",
    featuredImageAlt: "Freshly grilled chicken hibachi plate",
    intro:
      "Food has a special way of bringing people together. Whether it is a quick weekday breakfast, a relaxed family dinner, or a weekend meal with friends, the experience becomes more enjoyable when care is added to every plate. The good news is that creating delicious food at home does not need to feel overwhelming. A few simple ingredients, practical cooking techniques, and creative touches can completely transform an everyday meal.",
    body: [
      {
        type: "heading",
        content: "Start With Fresh, Simple Ingredients",
      },
      {
        type: "paragraph",
        content:
          "A great meal usually begins with ingredients that are fresh, flavorful, and easy to work with. Instead of filling your kitchen with dozens of items, focus on a few reliable ingredients that can be used in different ways.",
      },
      {
        type: "paragraph",
        content:
          "Fresh vegetables, seasonal fruits, herbs, grains, proteins, and basic pantry items can create countless meals. The key is choosing ingredients that complement one another without making the recipe unnecessarily complicated.",
      },
      {
        type: "paragraph",
        content:
          "Simple food often allows each flavor to stand out more clearly. A ripe tomato, freshly chopped herbs, toasted bread, or a well-seasoned piece of chicken can become the foundation of a satisfying dish.",
      },
      {
        type: "heading",
        content: "Build Flavor One Layer at a Time",
      },
      {
        type: "paragraph",
        content:
          "Flavor does not come from a single ingredient. It develops throughout the cooking process. Seasoning ingredients at different stages helps create a more balanced result. Salt, herbs, spices, citrus, garlic, and sauces can each add a different layer of flavor.",
      },
      {
        type: "paragraph",
        content:
          "For example, seasoning vegetables before roasting helps bring out their natural sweetness. Adding fresh herbs or lemon juice at the end gives the dish brightness and freshness. The goal is not to use every seasoning in the kitchen — it is to understand what the meal needs and add flavor thoughtfully.",
      },
      {
        type: "heading",
        content: "Five Easy Ways to Improve Everyday Meals",
      },
      {
        type: "list",
        items: [
          "Add fresh herbs — fresh parsley, basil, cilantro, mint, or green onion can instantly make a dish feel brighter and more complete.",
          "Include different textures — combine something soft with something crunchy, like toasted nuts on a salad or crispy onions on rice.",
          "Use a finishing sauce — a simple yogurt sauce, herb dressing, garlic butter, or spicy mayonnaise can bring the entire dish together.",
          "Add color to the plate — use colorful vegetables, fruits, herbs, and garnishes to make the meal more visually appealing.",
          "Serve the food thoughtfully — a clean plate, simple arrangement, and small garnish can make an ordinary meal feel more special.",
        ],
      },
    ],
    faq: [
      {
        id: "expensive-ingredients",
        question: "Do I need expensive ingredients to prepare great food?",
        answer: [
          {
            type: "paragraph",
            content:
              "No. Many satisfying meals are made with affordable and familiar ingredients. Good seasoning, proper cooking techniques, and thoughtful combinations are often more important than price.",
          },
        ],
      },
      {
        id: "taste-better",
        question: "How can I make simple food taste better?",
        answer: [
          {
            type: "paragraph",
            content:
              "Season the ingredients throughout the cooking process, use fresh herbs, add acidity with lemon or vinegar, and include a sauce or garnish before serving.",
          },
        ],
      },
      {
        id: "presentation",
        question: "What is the easiest way to improve food presentation?",
        answer: [
          {
            type: "paragraph",
            content:
              "Use a clean plate, avoid overcrowding, add color, and finish the dish with a small garnish or drizzle of sauce.",
          },
        ],
      },
      {
        id: "save-time",
        question: "How can I save time when cooking during the week?",
        answer: [
          {
            type: "paragraph",
            content:
              "Plan a few meals in advance, prepare basic ingredients ahead of time, and choose recipes that use similar vegetables, grains, proteins, or sauces.",
          },
        ],
      },
    ],
  },
  {
    slug: "flavor-layering-for-beginners",
    category: "Recipes",
    title: "Flavor Layering for Beginners",
    excerpt:
      "Learn how seasoning at different stages of cooking builds a more balanced, restaurant-quality dish. A few thoughtful passes of salt, herbs, and acid can transform an ordinary plate into something memorable.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "4 min read",
    featuredImage: "/menupage/hibachi/beef-hibachi-plate.jpg",
    featuredImageAlt: "Seasoned beef hibachi plate with vegetables",
    intro:
      "Restaurant-quality flavor rarely comes from a single ingredient. It comes from seasoning in layers, at the right stage of cooking, so every bite builds on the last.",
    body: [
      { type: "heading", content: "Season Early, Season Often" },
      {
        type: "paragraph",
        content:
          "Salt added at the start of cooking seasons the ingredient itself, not just its surface. Herbs and citrus added at the end preserve their brightness instead of cooking away.",
      },
      {
        type: "paragraph",
        content:
          "Try seasoning in three passes: once while the ingredient is raw, once mid-cook to adjust, and once just before serving to finish.",
      },
    ],
    faq: [
      {
        id: "when-to-salt",
        question: "When should I add salt while cooking?",
        answer: [
          {
            type: "paragraph",
            content:
              "Early, for the ingredient to absorb it, and again at the end to adjust to taste.",
          },
        ],
      },
      {
        id: "too-many-seasonings",
        question: "Can I use too many seasonings at once?",
        answer: [
          {
            type: "paragraph",
            content:
              "Yes — a few well-chosen seasonings that complement each other beat a crowded spice cabinet every time.",
          },
        ],
      },
    ],
  },
  {
    slug: "five-minute-finishing-sauces",
    category: "Recipes",
    title: "Five-Minute Finishing Sauces",
    excerpt:
      "Quick, no-fuss sauces that turn a simple weeknight plate into something worth sharing. A spoonful of the right sauce can tie together flavors and textures in just a few minutes of prep.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "3 min read",
    featuredImage: "/menupage/sushi/spicy-crab-shrimp-roll.jpg",
    featuredImageAlt: "Spicy crab and shrimp roll with finishing sauce",
    intro:
      "A good finishing sauce takes minutes to make and instantly makes a plate feel intentional rather than thrown together.",
    body: [
      { type: "heading", content: "Three Sauces Worth Keeping On Hand" },
      {
        type: "list",
        items: [
          "Spicy mayo — mayonnaise, a spoonful of chili sauce, and a squeeze of lime.",
          "Herb yogurt — plain yogurt, chopped herbs, garlic, and a pinch of salt.",
          "Garlic butter — melted butter, minced garlic, and a dash of soy sauce.",
        ],
      },
    ],
    faq: [
      {
        id: "how-long-do-sauces-keep",
        question: "How long do these sauces keep in the fridge?",
        answer: [
          {
            type: "paragraph",
            content:
              "Most finishing sauces stay fresh for three to four days in a sealed container.",
          },
        ],
      },
    ],
  },
  {
    slug: "plating-tips-that-actually-work-guide",
    category: "Food & Lifestyle",
    title: "Plating Tips That Actually Work",
    excerpt:
      "Small, practical presentation habits that make every plate look intentional. A clean plate, a little breathing room, and one thoughtful garnish go a long way toward a polished result.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "3 min read",
    featuredImage: "/menupage/hibachi/shrimp-hibachi-plate.jpg",
    featuredImageAlt: "Shrimp hibachi plate presented on a dark plate",
    intro:
      "Presentation is not about complicated techniques. A few consistent habits make any home-cooked plate look intentional.",
    body: [
      { type: "heading", content: "Habits That Make A Difference" },
      {
        type: "paragraph",
        content:
          "Use a clean plate, leave breathing room instead of overcrowding, and finish with one small garnish rather than several competing ones.",
      },
    ],
    faq: [
      {
        id: "one-plating-habit",
        question: "What is the single best habit to start with?",
        answer: [
          {
            type: "paragraph",
            content: "Stop overcrowding the plate — negative space reads as intentional.",
          },
        ],
      },
    ],
  },
  {
    slug: "weeknight-hibachi-shortcuts",
    category: "Recipes",
    title: "Weeknight Hibachi Shortcuts",
    excerpt:
      "Bring the hibachi-style sear and sauce to a weeknight pan without the long prep list. A hot skillet, quick timing, and a well-balanced glaze recreate that same signature flavor at home.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "5 min read",
    featuredImage: "/menupage/flame-combo/beef-and-salmon.jpg",
    featuredImageAlt: "Beef and salmon hibachi combo plate",
    intro:
      "Hibachi-style cooking is really about high heat, quick timing, and a well-balanced sauce — all achievable on a home stovetop.",
    body: [
      { type: "heading", content: "The Home Version" },
      {
        type: "paragraph",
        content:
          "Cook proteins and vegetables separately at high heat so each keeps its sear, then combine everything with a soy-butter glaze just before serving.",
      },
    ],
    faq: [
      {
        id: "hibachi-at-home",
        question: "Do I need a flat-top grill to cook hibachi-style at home?",
        answer: [
          {
            type: "paragraph",
            content:
              "No — a wide, well-heated skillet or wok gets you most of the way there.",
          },
        ],
      },
    ],
  },
  {
    slug: "why-fresh-ingredients-matter",
    category: "Restaurant News",
    title: "Why Fresh Ingredients Matter",
    excerpt:
      "A behind-the-scenes look at how ingredient sourcing shapes every plate we serve. Daily deliveries and same-day prep are small decisions that add up to a noticeably fresher dining experience.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "4 min read",
    featuredImage: "/menupage/flame-combo/chicken-and-beef.jpg",
    featuredImageAlt: "Chicken and beef combo plate with fresh vegetables",
    intro:
      "Fresh ingredients are the foundation of consistent flavor — they are also the hardest part of running a kitchen well.",
    body: [
      { type: "heading", content: "Sourcing, Not Shortcuts" },
      {
        type: "paragraph",
        content:
          "Produce delivered daily, proteins prepped same-day, and sauces made in-house are small decisions that add up to a noticeably fresher plate.",
      },
    ],
    faq: [
      {
        id: "sourcing-frequency",
        question: "How often are ingredients delivered?",
        answer: [
          { type: "paragraph", content: "Fresh produce and proteins are delivered daily." },
        ],
      },
    ],
  },
  {
    slug: "behind-the-grill-with-our-chefs",
    category: "Behind The Grill",
    title: "Behind the Grill With Our Chefs",
    excerpt:
      "Meet the team behind the flat-top and the techniques they rely on every service. Years of repetition and careful timing are what keep every dish consistent, plate after plate.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "5 min read",
    featuredImage: "/menupage/sushi/dancing-shrimp.jpg",
    featuredImageAlt: "Dancing shrimp roll prepared by our chefs",
    intro:
      "Every plate that leaves the grill passes through the hands of a chef who has run the same technique hundreds of times.",
    body: [
      { type: "heading", content: "Consistency Through Repetition" },
      {
        type: "paragraph",
        content:
          "Timing the sear, balancing the sauce, and plating quickly while everything is still hot — these are the small, repeated habits that keep every plate consistent.",
      },
    ],
    faq: [
      {
        id: "chef-training",
        question: "How are new chefs trained on the grill?",
        answer: [
          {
            type: "paragraph",
            content:
              "New chefs train alongside experienced team members until every dish meets the same standard.",
          },
        ],
      },
    ],
  },
  {
    slug: "pairing-sushi-with-simple-sides",
    category: "Food & Lifestyle",
    title: "Pairing Sushi With Simple Sides",
    excerpt:
      "Light, easy sides that let fresh sushi rolls stay the star of the meal. A simple salad or a light soup rounds things out without overwhelming the delicate flavors on the plate.",
    author: "Flame Japanese Hibachi Team",
    date: "July 20, 2026",
    readTime: "3 min read",
    featuredImage: "/menupage/sushi/green-dragon.jpg",
    featuredImageAlt: "Green dragon sushi roll plated with garnish",
    intro:
      "Sushi rolls are already balanced and flavorful — the right side dish should complement that, not compete with it.",
    body: [
      { type: "heading", content: "Keep It Light" },
      {
        type: "paragraph",
        content:
          "A simple cucumber salad, miso soup, or lightly dressed greens round out a sushi meal without overwhelming the delicate flavors of the rolls.",
      },
    ],
    faq: [
      {
        id: "best-sushi-side",
        question: "What is the easiest side to pair with sushi?",
        answer: [
          { type: "paragraph", content: "A simple cucumber salad with rice vinegar and sesame." },
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}

export function getBlogPostSummaries() {
  return blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    image: post.featuredImage,
    category: post.category,
  }));
}

export type BlogSearchParams = {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
};

export type BlogSearchResult = {
  posts: ReturnType<typeof getBlogPostSummaries>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function searchBlogPosts(params: BlogSearchParams): BlogSearchResult {
  let filtered = getBlogPostSummaries();

  if (params.category && params.category !== "All") {
    filtered = filtered.filter(
      (post) => post.category.toLowerCase() === params.category!.toLowerCase()
    );
  }

  if (params.q) {
    const q = params.q.toLowerCase().trim();
    
    const scored = filtered.map(post => {
      let score = 0;
      const title = post.title.toLowerCase();
      const category = post.category.toLowerCase();
      const excerpt = post.excerpt.toLowerCase();
      
      if (title === q) score = 100;
      else if (title.startsWith(q)) score = 80;
      else if (title.includes(q)) score = 60;
      else if (category.includes(q)) score = 40;
      else if (excerpt.includes(q)) score = 20;
      
      return { post, score };
    }).filter(item => item.score > 0);
    
    scored.sort((a, b) => b.score - a.score);
    filtered = scored.map(item => item.post);
  }

  const limit = params.limit || 6;
  const page = Math.max(1, params.page || 1);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return {
    posts: paginated,
    total,
    page,
    limit,
    totalPages,
  };
}
