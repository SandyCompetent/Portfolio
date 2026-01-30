import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      onClick={() => onClick(project)}
      className="group relative bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-primary/10 flex flex-col h-full"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="text-gray-400 group-hover:text-primary transition-colors w-5 h-5" />
        </div>
        <p className="text-gray-400 mb-4 line-clamp-3 flex-grow text-sm">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
