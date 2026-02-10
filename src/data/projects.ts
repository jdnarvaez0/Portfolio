import { icons } from "../lib/icons";

export interface Project {
  id: string;
  name: string;
  emoji: string;
  description: {
    en: string;
    es: string;
  };
  github?: string;
  url?: string;
  tags: {
    name: string;
    icon?: string;
  }[];
  updated?: boolean;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "gastiflow",
    name: "Gastiflow",
    emoji: "💰",
    description: {
      en: "Personal finance ecosystem with Telegram integration and AI-powered insights.",
      es: "Ecosistema de finanzas personales con integración de Telegram y análisis con IA.",
    },
    github: "https://github.com/jdnarvaez0/gastiflow",
    url: "https://gastiflow.vercel.app",
    tags: [
      { name: "Python", icon: icons.python },
      { name: "FastAPI", icon: icons.fastapi },
      { name: "Nuxt 3", icon: icons.vue },
    ],
    updated: true,
    featured: true,
  },
  {
    id: "farmaspot",
    name: "FarmaSpot",
    emoji: "💊",
    description: {
      en: "Real-time pharmacy availability tracker for Argentina with geolocation features.",
      es: "Rastreador de farmacias de turno en tiempo real para Argentina con geolocalización.",
    },
    github: "https://github.com/jdnarvaez0/FarmaSpot",
    tags: [
      { name: "Next.js", icon: icons.nextjs },
      { name: "Java", icon: icons.java },
      { name: "Spring Boot", icon: icons.springboot },
    ],
    featured: true,
  },
  {
    id: "telegram-bot",
    name: "Telegram Bot Template",
    emoji: "🤖",
    description: {
      en: "A scalable template for building Telegram bots with Python and python-telegram-bot.",
      es: "Plantilla escalable para construir bots de Telegram con Python y python-telegram-bot.",
    },
    github: "https://github.com/jdnarvaez0/telegram-bot-template",
    tags: [
      { name: "Python", icon: icons.python },
      { name: "Docker", icon: icons.docker },
    ],
  },
  {
    id: "api-starter",
    name: "FastAPI Starter",
    emoji: "⚡",
    description: {
      en: "Production-ready FastAPI starter with JWT auth, SQLAlchemy, and async support.",
      es: "Starter de FastAPI listo para producción con auth JWT, SQLAlchemy y soporte async.",
    },
    github: "https://github.com/jdnarvaez0/fastapi-starter",
    tags: [
      { name: "Python", icon: icons.python },
      { name: "FastAPI", icon: icons.fastapi },
      { name: "PostgreSQL", icon: icons.postgresql },
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    emoji: "🌐",
    description: {
      en: "Personal portfolio built with Astro, featuring i18n, dark mode, and modern animations.",
      es: "Portfolio personal construido con Astro, con i18n, modo oscuro y animaciones modernas.",
    },
    github: "https://github.com/jdnarvaez0/portfolio",
    url: "https://juannarvaez.dev",
    tags: [
      { name: "Astro", icon: icons.astro },
      { name: "TypeScript", icon: icons.typescript },
    ],
  },
  {
    id: "nestjs-boilerplate",
    name: "NestJS Boilerplate",
    emoji: "🛠️",
    description: {
      en: "Opinionated NestJS boilerplate with best practices, testing, and Docker setup.",
      es: "Boilerplate de NestJS con mejores prácticas, testing y configuración Docker.",
    },
    github: "https://github.com/jdnarvaez0/nestjs-boilerplate",
    tags: [
      { name: "Node.js", icon: icons.nodejs },
      { name: "NestJS", icon: icons.nestjs },
      { name: "TypeScript", icon: icons.typescript },
    ],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function searchProjects(query: string, lang: "en" | "es"): Project[] {
  const lowerQuery = query.toLowerCase();
  return projects.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description[lang].toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.name.toLowerCase().includes(lowerQuery))
  );
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t.name)));
  return Array.from(tagSet).sort();
}
