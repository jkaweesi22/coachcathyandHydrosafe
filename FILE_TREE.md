# Coach Cathy & HydroSafe — File Tree

```
CoachCathyHydrosafe/
├── next.config.ts          # output: "export", trailingSlash, images unoptimized
├── tailwind.config.ts       # Water palette, shadows, border radius
├── tsconfig.json
├── postcss.config.mjs       # tailwindcss, autoprefixer
├── package.json
├── .gitignore
├── .eslintrc.json
├── README.md
├── FILE_TREE.md
├── scripts/
│   └── generate-calendar-2026.ts   # Calendar dataset generator
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, Header, Footer, metadata
│   │   ├── page.tsx             # Home
│   │   ├── globals.css          # Tailwind, gradients, animations
│   │   ├── not-found.tsx        # 404
│   │   ├── about/page.tsx
│   │   ├── hydrosafe/page.tsx
│   │   ├── programs/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── calendar/page.tsx    # Client CalendarGrid
│   │   ├── routine/page.tsx     # Client RoutineChecklist
│   │   ├── meal-plan/page.tsx
│   │   ├── training/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog index
│   │   │   └── [slug]/page.tsx # generateStaticParams
│   │   └── resources/
│   │       ├── page.tsx         # Resources index
│   │       └── [slug]/page.tsx  # generateStaticParams
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── checkbox.tsx
│   │   ├── calendar/
│   │   │   └── CalendarGrid.tsx  # Mark complete, copy yesterday, reset, export/import
│   │   └── routine/
│   │       └── RoutineChecklist.tsx  # Editable, localStorage
│   ├── lib/
│   │   ├── utils.ts         # cn()
│   │   ├── icons.tsx        # Lucide icon mapper
│   │   ├── storage.ts       # localStorage helpers
│   │   └── seo.ts           # generateSEO, generateBreadcrumbJsonLd
│   └── data/
│       ├── site-config.ts
│       ├── site-config.json
│       ├── authors.json
│       ├── pages/
│       │   ├── home.json
│       │   ├── about.json
│       │   ├── hydrosafe.json
│       │   ├── programs.json
│       │   └── contact.json
│       ├── content/
│       │   ├── blog.json
│       │   └── resources.json
│       ├── calendar/
│       │   └── 2026.json
│       ├── routine/
│       │   └── templates.json
│       ├── nutrition/
│       │   └── meal-plan.json
│       └── training/
│           └── activities.json
```

## Static Routes (pre-rendered)
- `/` — Home
- `/about/` — About Coach Cathy
- `/hydrosafe/` — HydroSafe
- `/programs/` — Programs
- `/contact/` — Contact (Coach Cathy & HydroSafe: +256 700 127331)
- `/calendar/` — Calendar (client interactivity)
- `/routine/` — Daily routine checklist (client interactivity)
- `/meal-plan/` — Meal plan
- `/training/` — Training activities
- `/blog/` — Blog index
- `/resources/` — Resources index

## Dynamic Routes (generateStaticParams)
- `/blog/[slug]/` — getting-started-with-swimming, water-safety-essentials
- `/resources/[slug]/` — stroke-guide, pool-etiquette
