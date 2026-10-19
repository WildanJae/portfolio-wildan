export interface ProjectItem {
  id: string
  title: string
  category: "Enterprise" | "Commercial" | "Showcase"
  categoryLabel: string
  subtitle: string
  desc: string
  tags: string[]
  link?: string
  image: string
  year: string
  highlight: string
  architectureDetails?: {
    overview: string
    keyDecisions: { title: string; desc: string }[]
    metrics: string[]
  }
}

export interface SkillCategory {
  category: string
  items: {
    name: string
    level: "Core" | "Advanced" | "Proficient"
    note: string
  }[]
}

export const dict = {
  id: {
    nav: {
      about: "Tentang",
      projects: "Karya",
      skills: "Stack",
      experience: "Pengalaman",
      contact: "Kontak",
      hire: "Hubungi",
      available: "Tersedia untuk Proyek Baru",
      command: "Cari / Menu",
    },
    hero: {
      role_badge: "FRONT-END DEVELOPER · 3+ TAHUN",
      greeting: "Halo, saya",
      name: "Wildan Jaelani",
      headline: "Membangun sistem web berskala enterprise & antarmuka berkinerja tinggi.",
      subheadline: "Berbasis di Bandung, Indonesia. Spesialisasi dalam ekosistem TypeScript, Next.js, Angular, dan arsitektur Monorepo. Fokus pada type-safety ujung-ke-ujung, optimasi render, dan estetika visual yang presisi.",
      view_work: "Lihat Karya",
      lets_talk: "Hubungi via WhatsApp",
      copy_email: "Salin Email",
      copied: "Email disalin!",
      status: "Tersedia untuk Proyek Baru & Kontrak",
      location: "Bandung, ID (WIB / UTC+7)",
      quick_command_hint: "Tekan ⌘K untuk navigasi cepat",
    },
    about: {
      section_label: "01 / FILOSOFI & PENDEKATAN",
      heading: "Rekayasa perangkat lunak dengan standar performa dan kejelasan kode.",
      bio_p1: "Saya adalah Front-End Developer dengan pengalaman lebih dari 3 tahun dalam merancang dan mengembangkan antarmuka web modern. Sebagian besar waktu saya didedikasikan untuk membangun arsitektur front-end yang scalable, mempermudah kolaborasi tim, dan memberikan respon interaksi yang instan bagi pengguna.",
      bio_p2: "Di PT. Infinys System Indonesia, saya bertanggung jawab atas implementasi antarmuka aplikasi event management enterprise berskala besar menggunakan Angular dan Angular Material, serta mengintegrasikan API berkecepatan tinggi dengan Hono RPC dalam struktur Monorepo.",
      highlights: [
        { label: "Pengalaman", value: "3+ Tahun" },
        { label: "Spesialisasi", value: "Next.js · Angular · TS" },
        { label: "Arsitektur", value: "Monorepo & Type-Safe RPC" },
        { label: "Domisili", value: "Bandung, Indonesia" },
      ],
      pillars: [
        {
          title: "Type Safety Ujung ke Ujung",
          desc: "Menghubungkan kontrak tipe data dari backend (Hono RPC) langsung ke komponen front-end untuk mengeliminasi bug runtime sebelum mencapai tahap produksi.",
        },
        {
          title: "Performa & Core Web Vitals",
          desc: "Optimasi render cycles, code-splitting modular, dan loading state instan untuk pengalaman pengguna yang mulus tanpa layout shift.",
        },
        {
          title: "Arsitektur Skalabel",
          desc: "Pemisahan domain logika dan UI melalui monorepo, membuat basis kode tetap terkelola seiring bertambahnya kompleksitas fitur bisnis.",
        },
      ],
    },
    projects_section: {
      section_label: "02 / STUDI KASUS & KARYA",
      heading: "Karya Pilihan & Sistem Nyata",
      desc: "Menangani kebutuhan nyata — mulai dari sistem enterprise skala besar hingga web komersial modern dengan performa teroptimasi.",
      all_filter: "Semua",
      enterprise_filter: "Enterprise",
      commercial_filter: "Komersial",
      view_demo: "Kunjungi Website",
      view_architecture: "Lihat Detail Arsitektur",
      internal_project: "Proyek Enterprise Internal",
      tech_stack: "Teknologi Utama",
      close_modal: "Tutup",
    },
    skills_section: {
      section_label: "03 / TEKNOLOGI & INSTRUMEN",
      heading: "Tech Radar & Daily Drivers",
      desc: "Instrumen yang saya gunakan setiap hari dalam produksi untuk menghasilkan kode yang bersih, aman, dan mudah dirawat.",
      all: "Semua",
    },
    experience_section: {
      section_label: "04 / PERJALANAN KARIR",
      heading: "Pengalaman Profesional",
      desc: "Rekam jejak kontribusi teknis dalam membangun produk digital dan sistem antarmuka berskala produksi.",
    },
    contact_section: {
      section_label: "05 / KONTAK & DISKUSI",
      heading_1: "PUNYA IDE ATAU PROYEK?",
      heading_2: "MARI KITA BICARAKAN.",
      desc: "Terbuka untuk diskusi proyek freelance baru, posisi full-time, atau konsultasi arsitektur front-end.",
      chat_whatsapp: "WhatsApp Langsung",
      send_email: "Kirim Email",
      view_linkedin: "Kunjungi LinkedIn",
      availability: "Tersedia untuk proyek baru",
      location_text: "Bandung, Jawa Barat, Indonesia (WIB / UTC+7)",
      copy_cta: "Klik untuk menyalin alamat email",
    },
    footer: {
      crafted: "Dibuat dengan Next.js 14, TypeScript & Tailwind CSS",
      rights: "Hak Cipta Dilindungi.",
      local_time: "Waktu Lokal Bandung:",
      back_to_top: "Ke Atas",
    },
    command_menu: {
      title: "Menu Cepat",
      search_placeholder: "Ketik perintah atau cari...",
      nav_group: "Navigasi",
      action_group: "Aksi Cepat",
      social_group: "Tautan & Kontak",
      copy_email: "Salin Email (jwildan22904@gmail.com)",
      open_whatsapp: "Chat via WhatsApp",
      open_linkedin: "Buka Profil LinkedIn",
      switch_lang: "Switch to English",
      back_to_top: "Kembali ke Bagian Atas",
      empty: "Tidak ada perintah yang cocok.",
    },
    profile: {
      name: "Wildan Jaelani",
      role: "Front-End Developer",
      bio: "Front-End Developer berpengalaman 3+ tahun berbasis di Bandung. Spesialis Next.js, React, Angular, dan TypeScript.",
      email: "jwildan22904@gmail.com",
      whatsapp: "62895413466226",
      linkedin: "https://www.linkedin.com/in/wildan-j-82016b250/",
      location: "Bandung, Jawa Barat, Indonesia",
      photo: "/wildan2.png",
    },
    skills: [
      {
        category: "Frameworks & Libs",
        items: [
          { name: "Next.js", level: "Core", note: "App Router, SSR/SSG, Server Actions & Cache" },
          { name: "React", level: "Core", note: "Custom Hooks, Context, Component Isolation" },
          { name: "Angular", level: "Core", note: "Enterprise scale, Reactive Forms, Signals & RxJS" },
          { name: "Angular Material", level: "Advanced", note: "Enterprise UI kit customization & accessibility" },
          { name: "Laravel", level: "Proficient", note: "Blade templates, MVC architecture, REST controllers" },
        ],
      },
      {
        category: "Languages & Typing",
        items: [
          { name: "TypeScript", level: "Core", note: "Strict mode, Generics, RPC contract schemas" },
          { name: "JavaScript (ES6+)", level: "Core", note: "Async/Await, DOM APIs, Event driven" },
          { name: "HTML5 & Semantics", level: "Core", note: "Semantic structure, SEO, Accessibility (a11y)" },
          { name: "CSS3 & Modern Layouts", level: "Core", note: "CSS Grid, Flexbox, Container queries, Variables" },
          { name: "PHP", level: "Proficient", note: "Object-oriented backend scripting & API endpoints" },
        ],
      },
      {
        category: "Styling & Motion",
        items: [
          { name: "Tailwind CSS", level: "Core", note: "Design token systems, Responsive layouts, JIT" },
          { name: "Framer Motion", level: "Advanced", note: "Gestures, LayoutId transitions, Spring physics" },
          { name: "Responsive UI", level: "Core", note: "Mobile-first layouts, adaptive navigation, retina-ready" },
          { name: "Bootstrap", level: "Proficient", note: "Rapid prototyping & legacy dashboard maintenance" },
        ],
      },
      {
        category: "Architecture & Tools",
        items: [
          { name: "Hono RPC", level: "Core", note: "End-to-end type safety between client and server" },
          { name: "Monorepo Setup", level: "Advanced", note: "Modular workspace architecture & package sharing" },
          { name: "REST APIs & Axios", level: "Core", note: "Interceptor pipelines, error handling, caching" },
          { name: "Git & Version Control", level: "Core", note: "Branching strategies, PR reviews, merge management" },
          { name: "Vercel & CI/CD", level: "Advanced", note: "Edge deployment, preview branches, web vitals monitoring" },
        ],
      },
    ] as SkillCategory[],
    experiences: [
      {
        role: "Freelance Front-End Developer",
        company: "PT. Infinys System Indonesia",
        period: "Mei 2023 – Sekarang",
        type: "Freelance / Contract",
        summary: "Memimpin implementasi UI sistem event management enterprise berskala besar dengan arsitektur modern.",
        points: [
          "Membangun dan mengembangkan antarmuka aplikasi event management berskala enterprise menggunakan Angular 17+ dan Angular Material.",
          "Menerapkan arsitektur Monorepo untuk modularitas kode, reusabilitas komponen lintas modul, dan konsistensi tim pengembang.",
          "Mengintegrasikan backend API berkinerja tinggi menggunakan Hono (RPC) dengan type-safety menyeluruh tanpa desinkronisasi skema.",
          "Mengembangkan modul antarmuka berkecepatan tinggi dengan TypeScript, Next.js, dan Tailwind CSS untuk efisiensi render.",
        ],
        tags: ["Angular", "Angular Material", "TypeScript", "Monorepo", "Hono RPC", "Next.js"],
      },
      {
        role: "Front-End Developer Intern",
        company: "PT. Infinys System Indonesia",
        period: "Jan 2023 – Apr 2023",
        type: "Internship",
        summary: "Berkontribusi dalam slicing halaman, konsumsi REST API, dan optimalisasi tata letak responsif.",
        points: [
          "Melakukan slicing desain wireframe dan mockup UI/UX menjadi halaman web yang presisi, responsif, dan ramah aksesibilitas.",
          "Mengintegrasikan RESTful API pada aplikasi berbasis Next.js dan React dengan penanganan error dan loading state yang rapi.",
          "Mengoptimalkan performa halaman dan kecepatan pemuatan aset pada berbagai resolusi layar perangkat.",
        ],
        tags: ["Next.js", "React", "Tailwind CSS", "REST API", "JavaScript"],
      },
    ],
    projects: [
      {
        id: "01",
        title: "Enterprise Event Management System",
        category: "Enterprise",
        categoryLabel: "Enterprise Platform",
        subtitle: "Sistem Manajemen Acara & Arsitektur Monorepo",
        desc: "Platform manajemen acara skala enterprise yang menangani registrasi peserta berkapasitas besar, manajemen jadwal sesi interaktif, dan administrasi tiket secara real-time. Dibangun dengan Angular dan Hono RPC dalam struktur Monorepo untuk type-safety end-to-end.",
        tags: ["Angular", "TypeScript", "Hono RPC", "Monorepo", "Angular Material", "RxJS"],
        link: "",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85",
        year: "2023 – 2024",
        highlight: "Enterprise Production",
        architectureDetails: {
          overview: "Sistem ini dibangun untuk mengelola ribuan pendaftaran acara dengan kebutuhan integritas data tinggi dan UI yang sangat responsif.",
          keyDecisions: [
            {
              title: "Arsitektur Monorepo",
              desc: "Memisahkan pustaka UI komponen, utilitas bisnis, dan logika client API ke dalam paket modular sehingga mudah diuji dan digunakan kembali di seluruh aplikasi.",
            },
            {
              title: "Type Safety dengan Hono RPC",
              desc: "Menggunakan Hono Client RPC untuk berbagi tipe TypeScript langsung antara API dan front-end, mencegah ketidakcocokan payload data saat runtime.",
            },
            {
              title: "Angular Reactive State & RxJS",
              desc: "Manajemen aliran data asinkron menggunakan RxJS dan Angular Signals untuk pembaruan UI instan tanpa re-render yang tidak perlu.",
            },
          ],
          metrics: [
            "5,000+ Peserta terdaftar secara serentak",
            "100% Type-Safe dari API ke UI",
            "Sub-second waktu respon interaksi",
          ],
        },
      },
      {
        id: "02",
        title: "Nusantara Coffee",
        category: "Commercial",
        categoryLabel: "Brand & E-Commerce Landing",
        subtitle: "Landing Page Modern & Menu Interaktif",
        desc: "Website komersial untuk coffee shop modern dengan desain hangat dan responsif. Dilengkapi dengan sistem filter katalog menu dinamis, integrasi pemesanan WhatsApp instan, serta skor performa Lighthouse 98+ berkat Next.js App Router.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
        link: "https://cafe-landing-sage.vercel.app/",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=85",
        year: "2024",
        highlight: "Live Platform",
      },
      {
        id: "03",
        title: "Golden Stall (Warung Emas)",
        category: "Showcase",
        categoryLabel: "Hospitality & Dining",
        subtitle: "Fine Dining Restaurant Showcase",
        desc: "Antarmuka web premium untuk restoran fine dining dengan tata letak editorial kontemporer. Memadukan fotografi kuliner beresolusi tinggi yang teroptimasi, filter menu dinamis, serta transisi mikro menggunakan Framer Motion.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        link: "https://warung-emas.vercel.app",
        image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=85",
        year: "2024",
        highlight: "Live Platform",
      },
    ] as ProjectItem[],
  },
  en: {
    nav: {
      about: "About",
      projects: "Work",
      skills: "Stack",
      experience: "Experience",
      contact: "Contact",
      hire: "Get in Touch",
      available: "Available for Work",
      command: "Search / Menu",
    },
    hero: {
      role_badge: "FRONT-END DEVELOPER · 3+ YEARS",
      greeting: "Hello, I am",
      name: "Wildan Jaelani",
      headline: "Engineering enterprise-grade web systems & high-performance user interfaces.",
      subheadline: "Based in Bandung, Indonesia. Specializing in TypeScript, Next.js, Angular, and Monorepo architectures. Committed to end-to-end type safety, render performance, and meticulous visual precision.",
      view_work: "Explore Work",
      lets_talk: "Chat on WhatsApp",
      copy_email: "Copy Email",
      copied: "Email copied!",
      status: "Available for Projects & Contracts",
      location: "Bandung, ID (WIB / UTC+7)",
      quick_command_hint: "Press ⌘K for quick command palette",
    },
    about: {
      section_label: "01 / PHILOSOPHY & CRAFT",
      heading: "Engineering software with uncompromising performance and clarity.",
      bio_p1: "I am a Front-End Developer with over 3 years of hands-on experience crafting production-grade web applications. I dedicate my craft to building modular front-end architectures that teams enjoy maintaining and users find effortless to use.",
      bio_p2: "At PT. Infinys System Indonesia, I lead front-end implementation for large-scale enterprise event management applications using Angular, Angular Material, and Hono RPC within an enterprise Monorepo setup.",
      highlights: [
        { label: "Experience", value: "3+ Years" },
        { label: "Focus", value: "Next.js · Angular · TS" },
        { label: "Architecture", value: "Monorepo & Type-Safe RPC" },
        { label: "Location", value: "Bandung, Indonesia" },
      ],
      pillars: [
        {
          title: "End-to-End Type Safety",
          desc: "Bridging schema contracts directly from backend RPC endpoints (Hono) to client components, eradicating runtime type errors before code hits production.",
        },
        {
          title: "Performance & Core Web Vitals",
          desc: "Fine-tuning render cycles, asset bundling, and instant transition states to ensure silky smooth experiences without layout shifts.",
        },
        {
          title: "Scalable Architecture",
          desc: "Isolating business domains and UI libraries using monorepos, keeping codebases maintainable as business complexity grows.",
        },
      ],
    },
    projects_section: {
      section_label: "02 / SELECTED WORK & CASE STUDIES",
      heading: "Real-World Projects & Systems",
      desc: "Delivering tangible business value — from high-concurrency enterprise event engines to refined commercial web platforms.",
      all_filter: "All",
      enterprise_filter: "Enterprise",
      commercial_filter: "Commercial",
      view_demo: "Visit Website",
      view_architecture: "Inspect Architecture",
      internal_project: "Enterprise Internal System",
      tech_stack: "Core Stack",
      close_modal: "Close",
    },
    skills_section: {
      section_label: "03 / TECHNOLOGIES & TOOLS",
      heading: "Tech Radar & Daily Drivers",
      desc: "The battle-tested tools and frameworks I rely on daily to ship resilient, maintainable code.",
      all: "All",
    },
    experience_section: {
      section_label: "04 / CAREER HISTORY",
      heading: "Professional Experience",
      desc: "Chronological journey of engineering contributions across production-grade applications.",
    },
    contact_section: {
      section_label: "05 / GET IN TOUCH",
      heading_1: "HAVE A PROJECT IN MIND?",
      heading_2: "LET'S BUILD SOMETHING RESILIENT.",
      desc: "Open for discussions regarding new contract projects, full-time positions, or front-end architecture consulting.",
      chat_whatsapp: "WhatsApp Direct",
      send_email: "Send Email",
      view_linkedin: "View LinkedIn",
      availability: "Open for new opportunities",
      location_text: "Bandung, West Java, Indonesia (WIB / UTC+7)",
      copy_cta: "Click to copy email address",
    },
    footer: {
      crafted: "Crafted with Next.js 14, TypeScript & Tailwind CSS",
      rights: "All rights reserved.",
      local_time: "Bandung Local Time:",
      back_to_top: "Back to Top",
    },
    command_menu: {
      title: "Command Menu",
      search_placeholder: "Type a command or search...",
      nav_group: "Navigation",
      action_group: "Quick Actions",
      social_group: "Links & Contact",
      copy_email: "Copy Email (jwildan22904@gmail.com)",
      open_whatsapp: "Chat via WhatsApp",
      open_linkedin: "Open LinkedIn Profile",
      switch_lang: "Ganti ke Bahasa Indonesia",
      back_to_top: "Scroll Back to Top",
      empty: "No matching commands found.",
    },
    profile: {
      name: "Wildan Jaelani",
      role: "Front-End Developer",
      bio: "Front-End Developer with 3+ years experience based in Bandung. Specializing in Next.js, React, Angular, and TypeScript.",
      email: "jwildan22904@gmail.com",
      whatsapp: "62895413466226",
      linkedin: "https://www.linkedin.com/in/wildan-j-82016b250/",
      location: "Bandung, West Java, Indonesia",
      photo: "/wildan2.png",
    },
    skills: [
      {
        category: "Frameworks & Libs",
        items: [
          { name: "Next.js", level: "Core", note: "App Router, SSR/SSG, Server Actions & Cache" },
          { name: "React", level: "Core", note: "Custom Hooks, Context, Component Isolation" },
          { name: "Angular", level: "Core", note: "Enterprise scale, Reactive Forms, Signals & RxJS" },
          { name: "Angular Material", level: "Advanced", note: "Enterprise UI kit customization & accessibility" },
          { name: "Laravel", level: "Proficient", note: "Blade templates, MVC architecture, REST controllers" },
        ],
      },
      {
        category: "Languages & Typing",
        items: [
          { name: "TypeScript", level: "Core", note: "Strict mode, Generics, RPC contract schemas" },
          { name: "JavaScript (ES6+)", level: "Core", note: "Async/Await, DOM APIs, Event driven" },
          { name: "HTML5 & Semantics", level: "Core", note: "Semantic structure, SEO, Accessibility (a11y)" },
          { name: "CSS3 & Modern Layouts", level: "Core", note: "CSS Grid, Flexbox, Container queries, Variables" },
          { name: "PHP", level: "Proficient", note: "Object-oriented backend scripting & API endpoints" },
        ],
      },
      {
        category: "Styling & Motion",
        items: [
          { name: "Tailwind CSS", level: "Core", note: "Design token systems, Responsive layouts, JIT" },
          { name: "Framer Motion", level: "Advanced", note: "Gestures, LayoutId transitions, Spring physics" },
          { name: "Responsive UI", level: "Core", note: "Mobile-first layouts, adaptive navigation, retina-ready" },
          { name: "Bootstrap", level: "Proficient", note: "Rapid prototyping & legacy dashboard maintenance" },
        ],
      },
      {
        category: "Architecture & Tools",
        items: [
          { name: "Hono RPC", level: "Core", note: "End-to-end type safety between client and server" },
          { name: "Monorepo Setup", level: "Advanced", note: "Modular workspace architecture & package sharing" },
          { name: "REST APIs & Axios", level: "Core", note: "Interceptor pipelines, error handling, caching" },
          { name: "Git & Version Control", level: "Core", note: "Branching strategies, PR reviews, merge management" },
          { name: "Vercel & CI/CD", level: "Advanced", note: "Edge deployment, preview branches, web vitals monitoring" },
        ],
      },
    ] as SkillCategory[],
    experiences: [
      {
        role: "Freelance Front-End Developer",
        company: "PT. Infinys System Indonesia",
        period: "May 2023 – Present",
        type: "Freelance / Contract",
        summary: "Leading UI implementation for high-throughput enterprise event management systems with modern architecture.",
        points: [
          "Engineered enterprise-grade event management web applications using Angular 17+ and Angular Material.",
          "Implemented Monorepo architecture for component reusability, modular package isolation, and developer workflow efficiency.",
          "Integrated high-speed backend endpoints with Hono (RPC) ensuring end-to-end compile-time type safety.",
          "Developed high-performance client modules using TypeScript, Next.js, and Tailwind CSS for rapid rendering.",
        ],
        tags: ["Angular", "Angular Material", "TypeScript", "Monorepo", "Hono RPC", "Next.js"],
      },
      {
        role: "Front-End Developer Intern",
        company: "PT. Infinys System Indonesia",
        period: "Jan 2023 – Apr 2023",
        type: "Internship",
        summary: "Executed pixel-perfect UI slicing, REST API consumption, and responsive layout performance optimization.",
        points: [
          "Sliced UI/UX wireframes into accessible, responsive, and cross-browser compliant web interfaces using Tailwind CSS.",
          "Integrated RESTful API endpoints into Next.js and React applications with resilient loading states and error boundaries.",
          "Optimized asset loading and core layout rendering speeds across a diverse spectrum of screen viewports.",
        ],
        tags: ["Next.js", "React", "Tailwind CSS", "REST API", "JavaScript"],
      },
    ],
    projects: [
      {
        id: "01",
        title: "Enterprise Event Management System",
        category: "Enterprise",
        categoryLabel: "Enterprise Platform",
        subtitle: "Enterprise Event Engine & Monorepo Architecture",
        desc: "A mission-critical event management platform engineered to support high-throughput attendee registrations, session orchestrations, and real-time ticketing workflows. Built with Angular and Hono RPC inside an enterprise Monorepo for end-to-end type safety.",
        tags: ["Angular", "TypeScript", "Hono RPC", "Monorepo", "Angular Material", "RxJS"],
        link: "",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85",
        year: "2023 – 2024",
        highlight: "Enterprise Production",
        architectureDetails: {
          overview: "Architected to handle thousands of concurrent attendee transactions with high data integrity and sub-second UI responsiveness.",
          keyDecisions: [
            {
              title: "Monorepo Workspace Architecture",
              desc: "Separated shared UI primitives, business domain rules, and RPC client wrappers into decoupled packages, ensuring strict code boundaries.",
            },
            {
              title: "Hono RPC Schema Sharing",
              desc: "Shared TypeScript schemas directly between backend routes and front-end callers, eliminating drift and API runtime contract bugs.",
            },
            {
              title: "Reactive State with RxJS & Signals",
              desc: "Orchestrated complex asynchronous event streams, instant filtering, and responsive state updates with zero wasted render cycles.",
            },
          ],
          metrics: [
            "5,000+ Concurrent attendee registrations",
            "100% Type-safe from API to component",
            "Sub-second interactive response time",
          ],
        },
      },
      {
        id: "02",
        title: "Nusantara Coffee",
        category: "Commercial",
        categoryLabel: "Brand & E-Commerce Landing",
        subtitle: "Modern Specialty Coffee Landing Page",
        desc: "A bespoke commercial digital experience for a modern coffee brand. Features dynamic category filtering, instant WhatsApp order checkout flow, and 98+ Lighthouse scores powered by Next.js App Router and edge caching.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
        link: "https://cafe-landing-sage.vercel.app/",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=85",
        year: "2024",
        highlight: "Live Platform",
      },
      {
        id: "03",
        title: "Golden Stall (Warung Emas)",
        category: "Showcase",
        categoryLabel: "Hospitality & Dining",
        subtitle: "Fine Dining Visual Showcase",
        desc: "An editorial showcase for a high-end dining establishment. Combines curated photography, smooth spring-animated navigation with Framer Motion, and mobile-optimized menu exploration.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        link: "https://warung-emas.vercel.app",
        image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=85",
        year: "2024",
        highlight: "Live Platform",
      },
    ] as ProjectItem[],
  },
}
