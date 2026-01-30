import React, { useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowRight, Box } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div 
      ref={cardRef}
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative group cursor-pointer h-full ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovering ? 1.02 : 1}, ${isHovering ? 1.02 : 1}, 1)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Glassmorphism 2.0 Card */}
      <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20"></div>

      <div className="relative h-full flex flex-col p-6 z-10" style={{ transform: 'translateZ(20px)' }}>
        {/* Header: Title + Complexity Badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="bg-darker/50 p-3 rounded-2xl border border-white/5">
             <Box size={20} className="text-white" />
          </div>
          {project.complexity && (
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-white/10 rounded-full backdrop-blur-md">
              {project.complexity}
            </span>
          )}
        </div>

        <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {project.valueProposition}
        </p>

        {/* Dynamic Media Reveal (Simplified as Image for now, simulates video loop on hover) */}
        <div className="flex-grow relative rounded-xl overflow-hidden mb-6 h-40 bg-darker border border-white/5">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent"></div>
          
          <div className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="text-green-400 text-xs font-mono bg-green-900/30 px-2 py-1 rounded border border-green-500/20">
              {project.achievement}
            </span>
          </div>
        </div>

        {/* Tactile Tech Pills */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.slice(0, 3).map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#0f172a] text-gray-300 shadow-[0_2px_0_rgba(255,255,255,0.1)] active:shadow-none active:translate-y-[2px] transition-all border border-white/5 hover:text-white hover:border-white/20 select-none"
            >
              {tech}
            </span>
          ))}
          <div className="ml-auto p-2 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
             <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;