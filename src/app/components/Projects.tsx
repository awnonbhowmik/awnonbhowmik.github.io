'use client';

import projects, { type Project } from '@/app/data/projects';

const categoryLabels: Record<string, string> = {
  'privacy-security': 'Privacy & Security',
  'cryptography': 'Cryptography',
  'systems': 'Systems',
  'fullstack': 'Full-Stack Web',
  'data-ml': 'Data & ML',
  'mathematical-modeling': 'Mathematical Modeling',
};

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  prototype: 'Prototype',
};

const statusColors: Record<string, string> = {
  completed: 'border-green-500/50 text-green-400',
  'in-progress': 'border-accent/50 text-accent',
  prototype: 'border-yellow-500/50 text-yellow-400',
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="bg-gray-800 rounded-lg p-6 flex flex-col shadow-lg hover:shadow-xl transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 border border-gray-600 rounded px-2 py-0.5">
            {categoryLabels[project.category] ?? project.category}
          </span>
          <span
            className={`text-xs font-semibold uppercase tracking-widest border rounded px-2 py-0.5 ${
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
      <h3 className="text-xl font-semibold text-white mb-2 leading-snug">
        {project.title}
      </h3>

      {/* Summary */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow text-justify">
        {project.summary}
      </p>

      {/* Problem / Approach */}
      <div className="space-y-3 mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">
            Problem
          </p>
          <p className="text-gray-400 text-sm leading-relaxed text-justify">{project.problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">
            Approach
          </p>
          <p className="text-gray-400 text-sm leading-relaxed text-justify">{project.approach}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">
            Outcome
          </p>
          <p className="text-gray-400 text-sm leading-relaxed text-justify">{project.outcome}</p>
        </div>
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
              className="text-sm border border-accent text-accent px-4 py-1.5 rounded hover:bg-accent hover:text-white transition-colors"
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
    <section id="projects" className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white">Selected Projects</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            Research prototypes, published implementations, and engineering work spanning
            privacy-preserving systems, applied cryptography, and full-stack development.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            className="inline-block border border-accent text-accent px-6 py-2.5 rounded hover:bg-accent hover:text-white transition-colors"
          >
            View All Repositories on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
