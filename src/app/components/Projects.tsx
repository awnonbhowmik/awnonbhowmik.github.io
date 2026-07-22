'use client';

import projects, { type Project } from '@/app/data/projects';

const statusLabels: Record<Project['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
};

const statusColors: Record<Project['status'], string> = {
  completed: 'border-green-500/50 text-green-400',
  'in-progress': 'border-accent/50 text-accent',
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="min-w-0 bg-gray-800 rounded-lg p-4 sm:p-6 flex flex-col shadow-lg hover:shadow-xl motion-safe:transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex flex-wrap gap-2 items-center">
          <span
            className={`wrap-break-word text-xs font-semibold uppercase tracking-widest border rounded px-2 py-0.5 ${
              statusColors[project.status]
            }`}
          >
            {statusLabels[project.status]}
          </span>
        </div>
        {project.year && (
          <span className="text-gray-500 text-sm shrink-0">{project.year}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-2 leading-snug wrap-break-word">
        {project.title}
      </h3>

      {/* Summary */}
      <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed mb-4 grow text-left">
        {project.summary}
      </p>

      {/* Result */}
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">
          Result
        </p>
        <p className="text-gray-400 text-[15px] sm:text-base leading-relaxed text-left">{project.outcome}</p>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs border border-accent/30 text-gray-300 rounded-full px-3 py-0.5 hover:border-accent/60 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-auto pt-2">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm border border-accent text-accent px-4 py-1.5 rounded hover:bg-accent hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-12 sm:py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 id="projects-heading" className="text-3xl sm:text-4xl font-bold text-white">Featured Projects</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-[15px] sm:text-base leading-relaxed">
            Research prototypes and published implementations spanning privacy-preserving
            systems, applied cryptography, and cybersecurity engineering.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/awnonbhowmik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 max-w-full items-center justify-center border border-accent text-accent px-6 py-2.5 rounded hover:bg-accent hover:text-white transition-colors"
          >
            View All Repositories on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
