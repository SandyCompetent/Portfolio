import React, { useState } from 'react';
import { Menu, X, Download, Mail, Github, Linkedin, MapPin, ChevronDown } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import Modal from './components/Modal';
import AIChat from './components/AIChat';
import { PROJECTS, EXPERIENCE, SKILLS, BIO_SHORT, BIO_LONG, EMAIL, GITHUB_URL, LINKEDIN_URL } from './constants';
import { Project } from './types';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-darker text-gray-200 font-sans selection:bg-primary/30 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-darker/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SM.</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-full border border-white/10 transition-all"
              >
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-darker border-b border-white/10 absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-white/5"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="/resume.pdf"
                className="block px-3 py-2 text-primary font-medium"
              >
                Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] mb-6">
          <div className="bg-darker rounded-full px-4 py-1.5">
            <span className="text-xs font-semibold text-white tracking-wide uppercase">Open for Opportunities</span>
          </div>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Sandeep Malviya</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
          {BIO_SHORT}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#projects" className="px-8 py-3 bg-primary hover:bg-blue-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary/25">
            View My Work
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-all flex items-center justify-center gap-2">
            <Github size={20} /> GitHub
          </a>
        </div>
        
        <div className="mt-16 sm:mt-24 text-gray-500 animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* About/Bio Section */}
      <section className="py-20 bg-dark/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-primary pl-4">About Me</h2>
          <div className="prose prose-lg prose-invert text-gray-400 leading-8">
             <p className="whitespace-pre-line">{BIO_LONG}</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Arsenal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS.map((category) => (
            <div key={category.name} className="bg-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-primary to-transparent rounded-full"></span>
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-800 text-slate-200 text-sm rounded-md border border-slate-700/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-dark/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Journey So Far</h2>
          <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <div key={exp.id} className="relative pl-8 md:pl-0">
                {/* Timeline Line */}
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
                
                <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="hidden md:block w-[50%]"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-[50%] top-0 w-4 h-4 rounded-full bg-primary border-4 border-darker -translate-x-1.5 md:-translate-x-1/2 mt-1.5 z-10"></div>

                  <div className="md:w-[45%]">
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-4 font-mono">{exp.period}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 bg-gray-500 rounded-full flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Featured Projects</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          From plotting brain waves to building smooth mobile interfaces. Click on any card to learn more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={setSelectedProject} 
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-darker to-indigo-950/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Let's Connect</h2>
          <p className="text-gray-400 mb-10">
            I'm currently based in Exeter, UK, and open to full-time roles in Data Science, ML Engineering, or Full Stack Development.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <a href={`mailto:${EMAIL}`} className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group">
              <Mail className="text-primary group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium">{EMAIL}</span>
            </a>
             <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 rounded-xl border border-white/10">
              <MapPin className="text-secondary" />
              <span className="text-white font-medium">Exeter, United Kingdom</span>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="p-3 bg-card rounded-full text-gray-400 hover:text-white hover:bg-slate-800 transition-all">
              <Github size={24} />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="p-3 bg-card rounded-full text-gray-400 hover:text-white hover:bg-blue-700 transition-all">
              <Linkedin size={24} />
            </a>
            <a href="/resume.pdf" target="_blank" className="p-3 bg-card rounded-full text-gray-400 hover:text-white hover:bg-green-700 transition-all" title="Download Resume">
              <Download size={24} />
            </a>
          </div>

          <footer className="mt-20 text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Sandeep Malviya. Built with React, Tailwind & Gemini API.</p>
          </footer>
        </div>
      </section>

      {/* Global Elements */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
      <AIChat />
    </div>
  );
};

export default App;
