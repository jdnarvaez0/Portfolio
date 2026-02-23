import { icons } from "../lib/icons";
import { checkMultipleRepos, type RepoData } from "../lib/github";

export interface Project {
  id: string;
  name: string;
  emoji?: string;
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
  updated?: boolean; // Will be auto-populated from GitHub API
  featured?: boolean;
  lastCommitDate?: string;
}

// Base project data (without updated status)
const baseProjects: Omit<Project, 'updated' | 'lastCommitDate'>[] = [
  {
    id: "gastiflow",
    name: "Gastiflow",
    emoji: "💰",
    description: {
      en: "Personal finance app with Telegram integration and AI-powered insights.",
      es: "App de finanzas personales con integración de Telegram y análisis con IA.",
    },
    github: "https://github.com/jdnarvaez0/gastiflow",
    url: "https://gastiflow.vercel.app",
    tags: [
      { name: "Python", icon: icons.python },
      { name: "FastAPI", icon: icons.fastapi },
      { name: "Nuxt 3", icon: icons.vue },
    ],
    featured: true,
  },
  {
    id: "farmaspot",
    name: "FarmaSpot",
    emoji: "💊",
    description: {
      en: "Real-time pharmacy availability tracker for Argentina.",
      es: "Rastreador de farmacias de turno en tiempo real para Argentina.",
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
      en: "A scalable template for building Telegram bots with Python.",
      es: "Plantilla escalable para construir bots de Telegram con Python.",
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
      en: "Production-ready FastAPI starter with JWT auth and async support.",
      es: "Starter de FastAPI listo para producción con auth JWT y soporte async.",
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
      en: "Personal portfolio built with Astro, featuring i18n and dark mode.",
      es: "Portfolio personal construido con Astro, con i18n y modo oscuro.",
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
      en: "Opinionated NestJS boilerplate with best practices and testing.",
      es: "Boilerplate de NestJS con mejores prácticas y testing.",
    },
    github: "https://github.com/jdnarvaez0/nestjs-boilerplate",
    tags: [
      { name: "Node.js", icon: icons.nodejs },
      { name: "NestJS", icon: icons.nestjs },
      { name: "TypeScript", icon: icons.typescript },
    ],
  },
];

// Cache for repo data to avoid multiple API calls
let repoDataCache: Map<string, RepoData> | null = null;

/**
 * Fetch updated status from GitHub API
 */
async function fetchRepoData(): Promise<Map<string, RepoData>> {
  if (repoDataCache) {
    return repoDataCache;
  }
  
  const reposWithGithub = baseProjects
    .filter(p => p.github)
    .map(p => ({ id: p.id, githubUrl: p.github! }));
  
  repoDataCache = await checkMultipleRepos(reposWithGithub);
  return repoDataCache;
}

/**
 * Get all projects with updated status from GitHub
 */
export async function getProjects(): Promise<Project[]> {
  const repoData = await fetchRepoData();
  
  return baseProjects.map(project => {
    const data = repoData.get(project.id);
    return {
      ...project,
      updated: data?.updated ?? false,
      lastCommitDate: data?.lastCommitDate,
    };
  });
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

/**
 * Get all projects (sync version for backwards compatibility)
 * Note: This won't have the updated status, use getProjects() instead
 */
export function getAllProjects(): Project[] {
  return baseProjects.map(project => ({
    ...project,
    updated: false,
  }));
}

export function searchProjects(query: string, lang: "en" | "es"): Project[] {
  const lowerQuery = query.toLowerCase();
  return getAllProjects().filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description[lang].toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.name.toLowerCase().includes(lowerQuery))
  );
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  baseProjects.forEach((p) => p.tags.forEach((t) => tagSet.add(t.name)));
  return Array.from(tagSet).sort();
}
