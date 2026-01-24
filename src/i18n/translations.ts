export const translations = {
    en: {
        // Hero
        hero: {
            greeting: "I'm",
            name: "Juan",
            description: "a Software Engineer from Buenos Aires, Argentina with +3 years of experience. I love building solid backends, clean APIs, and contributing to solutions that combine well-structured code with real impact.",
        },
        // Sections
        sections: {
            projects: "Projects",
            experience: "Experience",
            posts: "Posts",
            more: "More",
        },
        // Experience
        experience: {
            present: "Present",
            ataway: {
                title: "Backend Developer",
                company: "Ataway",
                description: "Participation in the design and development of backend architectures using Node.js, Nest.js, and TypeScript, applied in solutions for the Cencosud client. Development of RESTful APIs, implementation of controllers, models, and unit tests. Integration with PostgreSQL databases and use of Docker for deployment and orchestration.",
            },
            integrations: {
                title: "Integrations Developer",
                company: "Ataway",
                description: "Design and implementation of data integration processes using UKG and Dell Boomi for corporate clients. Development of custom functionalities and optimization of information flows ensuring system stability.",
            },
            coderhouse: {
                title: "Programming Tutor",
                company: "Coder House",
                description: "Tutor for Web Development, JavaScript, React.js, and Backend courses. I accompany students in their learning process through personalized project reviews and technical challenges.",
            },
        },
        // Posts
        posts: {
            readMore: "Read more",
        },
        // Common
        common: {
            viewOnGithub: "View on GitHub",
        },
        // Language toggle
        lang: {
            switch: "ES",
            label: "Switch to Spanish",
        },
    },
    es: {
        // Hero
        hero: {
            greeting: "Soy",
            name: "Juan",
            description: "Software Engineer de Buenos Aires, Argentina, con +3 años de experiencia. Me encanta construir backends sólidos, APIs limpias y contribuir a soluciones que combinen código bien estructurado con impacto real.",
        },
        // Sections
        sections: {
            projects: "Proyectos",
            experience: "Experiencia",
            posts: "Publicaciones",
            more: "Ver más",
        },
        // Experience
        experience: {
            present: "Actualidad",
            ataway: {
                title: "Desarrollador Backend",
                company: "Ataway",
                description: "Participación en el diseño y desarrollo de arquitecturas backend utilizando Node.js, Nest.js y TypeScript, aplicadas en soluciones para el cliente Cencosud. Desarrollo de APIs RESTful, implementación de controladores, modelos y pruebas unitarias. Integración con bases de datos PostgreSQL y uso de Docker para despliegue y orquestación.",
            },
            integrations: {
                title: "Desarrollador de Integraciones",
                company: "Ataway",
                description: "Diseño e implementación de procesos de integración de datos utilizando UKG y Dell Boomi para clientes corporativos. Desarrollo de funcionalidades personalizadas y optimización de flujos de información asegurando la estabilidad del sistema.",
            },
            coderhouse: {
                title: "Tutor de Programación",
                company: "Coder House",
                description: "Tutor de los cursos de Desarrollo Web, JavaScript, React.js y Backend. Acompaño a estudiantes en su proceso formativo mediante revisiones personalizadas de proyectos y desafíos técnicos.",
            },
        },
        // Posts
        posts: {
            readMore: "Leer más",
        },
        // Common
        common: {
            viewOnGithub: "Ver en GitHub",
        },
        // Language toggle
        lang: {
            switch: "EN",
            label: "Cambiar a Inglés",
        },
    },
};

export type Lang = keyof typeof translations;

export function t(lang: Lang, key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
        value = value?.[k];
    }

    return value ?? key;
}

export function getLangFromUrl(url: URL): Lang {
    const [, lang] = url.pathname.split('/');
    if (lang === 'es') return 'es';
    return 'en';
}

export function getLocalizedPath(path: string, lang: Lang): string {
    if (lang === 'es') {
        return path === '/' ? '/es' : `/es${path}`;
    }
    return path;
}
