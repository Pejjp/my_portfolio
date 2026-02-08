import React from 'react';
import { useTranslations } from 'next-intl';

const TechStack = () => {
  const techStack = useTranslations("techStack");

  const technologies = [
    // Languages
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'languages' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'languages' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'languages' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'languages' },
    { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'languages' },
    { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', category: 'languages' },
    { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', category: 'languages' },
    { name: 'HTML/CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'languages' },

    // Frameworks
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frameworks' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'frameworks' },
    { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', category: 'frameworks' },
    { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', category: 'frameworks' },
    { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', category: 'frameworks' },

    // Databases
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'databases' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'databases' },
    { name: 'Snowflake', logo: 'https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg', category: 'databases' },

    // Cloud & DevOps
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'cloud' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'cloud' },
    { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', category: 'cloud' },
    { name: 'CI/CD', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'cloud' },

    // Tools
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'tools' },
    { name: 'GitHub Actions', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'tools' },
    { name: 'Jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', category: 'tools' },
    { name: 'Postman', logo: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg', category: 'tools' },
    { name: 'IntelliJ', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg', category: 'tools' },
    { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'tools' },
  ];

  return (
    <div className="relative w-screen -ml-[20vw] -mr-[20vw] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-2 md:mb-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text-light-primary dark:text-text-dark-primary mb-2">
          {techStack("title")}
        </h2>
        <p className="text-sm md:text-base text-center text-text-light-secondary dark:text-text-dark-secondary">
          {techStack("subtitle")}
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-light via-brand-light/80 to-transparent dark:from-brand-dark dark:via-brand-dark/80 z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-light via-brand-light/80 to-transparent dark:from-brand-dark dark:via-brand-dark/80 z-10 pointer-events-none"></div>

        {/* Scrolling container - hover on this parent pauses both children */}
        <div className="flex overflow-hidden scroll-container group">
          <div className="flex scroll-animation py-3 md:py-5">
            {technologies.map((tech, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-3 md:mx-6"
              >
                <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-surface-light-elevated dark:bg-surface-dark-elevated rounded-lg md:rounded-xl border border-border-light dark:border-border-dark hover:border-brand-accent dark:hover:border-brand-accent transition-all duration-300 hover:scale-110 hover:shadow-accent w-24 h-24 md:w-32 md:h-32">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-3 object-contain dark:invert-0 opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <span className="text-xs md:text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary text-center hover:text-brand-accent transition-colors leading-tight">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate for seamless loop */}
          <div className="flex scroll-animation py-3 md:py-5" aria-hidden="true">
            {technologies.map((tech, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-3 md:mx-6"
              >
                <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-surface-light-elevated dark:bg-surface-dark-elevated rounded-lg md:rounded-xl border border-border-light dark:border-border-dark hover:border-brand-accent dark:hover:border-brand-accent transition-all duration-300 hover:scale-110 hover:shadow-accent w-24 h-24 md:w-32 md:h-32">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-3 object-contain dark:invert-0 opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <span className="text-xs md:text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary text-center hover:text-brand-accent transition-colors leading-tight">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .scroll-animation {
          animation: scroll 40s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        }

        .group:hover .scroll-animation {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TechStack;