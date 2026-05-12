export const profile = {
  name: "Wildan Jaelani",
  role: "Front-End Developer",
  tagline: "Membangun antarmuka web yang cepat, responsif, dan bersih.",
  bio: "Front-End Developer dengan pengalaman 2+ tahun. Spesialis Next.js, React, Angular, dan TypeScript. Saat ini aktif sebagai Freelance Developer sekaligus menempuh S1 Teknik Informatika.",
  email: "jwildan22904@gmail.com",
  whatsapp: "6289541346622",
  linkedin: "https://linkedin.com/in/wildan-j-82016b25b",
  location: "Bandung, Jawa Barat",
  photo: "/wildan.jpg",
};

export const skills = [
  {
    category: "Framework & Library",
    items: ["Next.js", "React", "Angular", "Angular Material", "Laravel"],
  },
  {
    category: "Bahasa",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "PHP"],
  },
  { category: "Styling", items: ["Tailwind CSS", "Bootstrap"] },
  {
    category: "Tools",
    items: ["Git", "REST API", "Monorepo", "Hono (RPC)", "Axios"],
  },
];

export const experiences = [
  {
    role: "Freelance Front-End Developer",
    company: "PT. Infinys System Indonesia",
    period: "Mei 2023 – Sekarang",
    points: [
      "Membangun aplikasi event management menggunakan Angular dan Angular Material",
      "Mengimplementasikan arsitektur Monorepo untuk proyek skala besar",
      "Integrasi backend API menggunakan Hono (RPC) pada sisi front-end",
      "Mengembangkan fitur UI kompleks dengan TypeScript, Next.js, dan Tailwind CSS",
    ],
  },
  {
    role: "Front-End Developer — Praktek Kerja Lapangan",
    company: "PT. Infinys System Indonesia",
    period: "Jan 2023 – Apr 2023",
    points: [
      "Slicing halaman website menggunakan Tailwind CSS",
      "Konsumsi API menggunakan framework Next.js",
      "Membangun tampilan responsif dengan fitur Dark Mode",
    ],
  },
];

export const projects = [
  {
    title: "Cafe Landing Page — Kopi Nusantara",
    desc: "Landing page cafe modern dengan tema warm & cozy. Static site, menu filter interaktif, tombol WhatsApp, dan deploy-ready di Vercel.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://cafe-landing-sage.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
  },
  {
    title: "Fine Dining Landing Page — Warung Emas",
    desc: "Landing page restoran premium dengan tema dark & elegant. Foto menu asli, filter kategori, animasi hover, dan fully responsive.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://warung-emas.vercel.app",
    image:
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80",
  },
  {
    title: "Event Management Application",
    desc: "Aplikasi manajemen event skala besar menggunakan Angular dengan arsitektur Monorepo, integrasi API Hono, dan TypeScript.",
    tags: ["Angular", "TypeScript", "Monorepo", "Hono"],
    link: "",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
];
