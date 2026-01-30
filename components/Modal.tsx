import React, { useEffect } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative bg-card w-full max-w-3xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-[fadeIn_0.2s_ease-out]">
        
        {/* Header Image */}
        <div className="h-64 sm:h-80 w-full relative">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium text-sm">
                  <Github size={16} /> Code
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors font-medium text-sm">
                  <ExternalLink size={16} /> Demo
                </a>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
            <p className="whitespace-pre-wrap">{project.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
