import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Menu, X, Download, Mail, Github, Linkedin, MapPin, ChevronDown, Search, Send, Loader2, CheckCircle, ChevronLeft, ChevronRight, Star, GitFork, Sparkles, ExternalLink, GitBranch, Briefcase, ArrowRight, ArrowLeft, Instagram } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import Modal from './components/Modal';
import AIChat from './components/AIChat';
import { PROJECTS, EXPERIENCE, SKILLS, BIO_SHORT, BIO_LONG, EMAIL, GITHUB_URL, LINKEDIN_URL, KAGGLE_URL, INSTAGRAM_URL } from './constants';
import { Project } from './types';
import { fetchGitHubRepos } from './services/githubService';

// Custom Kaggle Icon Component
const KaggleIcon = ({ className = "w-6 h-6", size = 24 }: { className?: string, size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    width={size}
    height={size}
    className={className}
    role="img" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.29 22.35l-.89-3.08-1.28-4.46h-2.7v7.54H3.59V1.65h3.83v10.15h2.52l3.22-4.9h4.37l-4.22 6.07 4.69 9.38h-5.71z"/>
  </svg>
);

const App: React.FC = () => {
  // Navigation State
  const [view, setView] = useState<'home' | 'works'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interaction State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Data States
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [isFetchingGithub, setIsFetchingGithub] = useState(false);
  
  // Project Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Constants
  const categories = ['All', 'Mobile', 'Data Science', 'Web', 'Python', 'Flutter'];

  // Global Mouse Follower logic
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  // Fetch GitHub projects on mount
  useEffect(() => {
    const loadGithubProjects = async () => {
      setIsFetchingGithub(true);
      const repos = await fetchGitHubRepos();
      setGithubProjects(repos);
      setIsFetchingGithub(false);
    };
    loadGithubProjects();
  }, []);

  const getProjectCategories = (p: Project) => {
    const cats = ['All'];
    const stack = p.techStack.join(' ').toLowerCase();
    if (stack.includes('flutter') || stack.includes('kotlin') || stack.includes('ios') || stack.includes('android')) cats.push('Mobile');
    if (stack.includes('python') || stack.includes('tensorflow') || stack.includes('pytorch') || stack.includes('panda') || stack.includes('r')) cats.push('Data Science');
    if (stack.includes('react') || stack.includes('web') || stack.includes('html') || stack.includes('typescript')) cats.push('Web');
    if (stack.includes('python')) cats.push('Python');
    if (stack.includes('flutter')) cats.push('Flutter');
    return cats;
  };

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const projectCats = getProjectCategories(project);
      const matchesFilter = activeFilter === 'All' || projectCats.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  // Display Logic: Show all filtered projects on 'works' page, but only top 3 on 'home'
  const displayedProjects = view === 'works' ? filteredProjects : PROJECTS.slice(0, 3);

  const handleNavClick = (targetView: 'home' | 'works', sectionId?: string) => {
    setView(targetView);
    setMobileMenuOpen(false);
    
    if (sectionId) {
      // Small delay to allow view transition before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 font-sans selection:bg-primary/30 selection:text-white overflow-x-hidden relative">
      
      {/* Vivid Glow Mouse Follower (Fixed Background) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`
        }}
      />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-[#020617]/70 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer" 
              onClick={() => handleNavClick('home', 'about')}
            >
              <span className="text-2xl font-display font-bold text-white tracking-tighter">
                SM<span className="text-primary">.</span>dev
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick('home', 'about')} 
                className={`text-sm font-medium transition-colors tracking-wide ${view === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('works')} 
                className={`text-sm font-medium transition-colors tracking-wide ${view === 'works' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Works
              </button>
              <button 
                onClick={() => handleNavClick('home', 'github')} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-wide"
              >
                Open Source
              </button>
              <button 
                onClick={() => handleNavClick('home', 'experience')} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-wide"
              >
                Journey
              </button>
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-lg border border-white/10 transition-all hover:border-white/30 backdrop-blur-md"
              >
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden bg-[#020617] border-b border-white/10 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-4 pb-6 space-y-2">
            <button
              onClick={() => handleNavClick('home', 'about')}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-white/5"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('works')}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-white/5"
            >
              Works
            </button>
            <button
               onClick={() => handleNavClick('home', 'experience')}
               className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-white/5"
            >
              Journey
            </button>
            <a 
              href="/resume.pdf"
              className="block px-3 py-3 text-primary font-bold"
            >
              Download Resume
            </a>
          </div>
        </div>
      </nav>

      {/* VIEW: HOME */}
      {view === 'home' && (
        <main>
          {/* Hero Section */}
          <section id="about" className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-start z-10">
            <div className="absolute top-40 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none animate-pulse-slow" />
            
            <div className="animate-fade-up">
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-mono mb-6 backdrop-blur-md">
                ● Available for hire
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-mono text-gray-400 mb-2 animate-fade-up" style={{ animationDelay: '0.05s' }}>
              Hi, I'm Sandeep Malviya.
            </h2>

            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight text-white mb-8 leading-[0.9] animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Tactile<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-100">Intelligence.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {BIO_SHORT} A fusion of high-performance mobile engineering and rigorous data science.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => setView('works')} className="px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Explore Work
              </button>
              
              <div className="flex items-center gap-3">
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="p-3 bg-white/5 text-white rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 hover:text-primary transition-all" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="p-3 bg-white/5 text-white rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 hover:text-blue-500 transition-all" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href={KAGGLE_URL} target="_blank" rel="noreferrer" className="p-3 bg-white/5 text-white rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 hover:text-sky-400 transition-all" aria-label="Kaggle">
                  <KaggleIcon size={20} />
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="p-3 bg-white/5 text-white rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 hover:text-pink-500 transition-all" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            {/* Stats Strip */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-12 w-full animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">2+</h4>
                <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">Years Exp</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">5</h4>
                <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">Shipped Apps</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">MSc</h4>
                <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">Data Science</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">98%</h4>
                <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">Model Accuracy</p>
              </div>
            </div>
          </section>

          {/* Featured Projects Section (Limited to 3) */}
          <section id="projects" className="py-32 max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-fade-up">
              <div>
                <h2 className="text-4xl font-display font-bold text-white mb-2">Selected Works</h2>
                <p className="text-gray-400">Highlights from my engineering journey.</p>
              </div>
              <button 
                onClick={() => setView('works')}
                className="group flex items-center gap-2 text-primary font-bold hover:text-white transition-colors"
              >
                View All Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[450px]">
              {displayedProjects.map((project, idx) => (
                <div 
                  key={project.id} 
                  className={`opacity-0 animate-fade-up ${
                    // Bento Layout: Make 1st item span 2 cols
                    (idx === 0) ? 'md:col-span-2' : ''
                  }`} 
                  style={{ animationDelay: `${0.1 * idx}s` }}
                >
                  <ProjectCard 
                    project={project} 
                    onClick={setSelectedProject} 
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
               <button 
                 onClick={() => setView('works')}
                 className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white font-semibold transition-all"
               >
                 View All Works
               </button>
            </div>
          </section>

          {/* GitHub Section (Limited) */}
          <section id="github" className="py-20 border-t border-white/5 relative bg-[#020617]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-4 mb-10 animate-fade-up">
                <div className="p-3 bg-white/5 rounded-full border border-white/10">
                  <Github className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-display font-bold text-white">Open Source</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubProjects.slice(0, 3).map((repo, i) => (
                  <a 
                    key={repo.id} 
                    href={repo.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 animate-fade-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-white group-hover:text-primary transition-colors">{repo.title}</h3>
                      <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                    </div>
                    <p className="text-sm text-gray-400 mb-6 line-clamp-2">{repo.valueProposition}</p>
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                      <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {repo.achievement.split(' ')[0]}</span>
                      <span className="flex items-center gap-1"><GitBranch size={12} className="text-blue-400" /> {repo.techStack[0]}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Experience / Journey Section */}
          <section id="experience" className="py-32 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex items-center gap-4 mb-16 animate-fade-up">
                <div className="p-3 bg-white/5 rounded-full border border-white/10">
                  <Briefcase className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-display font-bold text-white">The Journey</h2>
            </div>

            <div className="relative border-l border-white/10 ml-3 space-y-12 pb-12">
              {EXPERIENCE.map((exp, index) => (
                <div key={exp.id} className="relative pl-8 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Timeline Dot */}
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)] ring-4 ring-[#020617]"></div>
                  
                  <div className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 p-8 rounded-2xl transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                          <p className="text-gray-400 font-medium text-lg flex items-center gap-2">
                            {exp.company}
                            {exp.location && (
                              <span className="text-sm text-gray-500 flex items-center gap-1 font-normal border-l border-white/10 pl-2">
                                 <MapPin size={14} /> {exp.location}
                              </span>
                            )}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-gray-500 bg-black/30 px-3 py-1 rounded-full border border-white/5 w-fit whitespace-nowrap">
                          {exp.period}
                        </span>
                    </div>
                    <ul className="space-y-3 mt-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 bg-gray-600 rounded-full flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Footer */}
          <footer id="contact" className="py-32 relative overflow-hidden bg-black">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 tracking-tighter">
                Let's build the <br /><span className="text-gray-600">future.</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Open for full-stack, mobile, and data science roles.
              </p>
              <a 
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
              >
                <Mail size={20} /> Say Hello
              </a>
              
              <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                <p>&copy; 2025 Sandeep Malviya.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  <a href={LINKEDIN_URL} className="hover:text-white transition-colors">LinkedIn</a>
                  <a href={GITHUB_URL} className="hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* VIEW: WORKS (ALL PROJECTS) */}
      {view === 'works' && (
        <main className="pt-32 pb-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-fade-up">
               <div>
                  <button 
                    onClick={() => setView('home')} 
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                  >
                    <ArrowLeft size={20} /> Back to Home
                  </button>
                  <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
                    All Works
                  </h1>
               </div>

               {/* Search Bar */}
               <div className="relative w-full md:w-96 mt-6 md:mt-0">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Search className="h-5 w-5 text-gray-500" />
                 </div>
                 <input
                   type="text"
                   className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                   placeholder="Search technology, title..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-16 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 border ${
                    activeFilter === cat 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Full Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[450px]">
              {displayedProjects.length > 0 ? (
                displayedProjects.map((project, idx) => (
                  <div 
                    key={project.id} 
                    className="opacity-0 animate-fade-up"
                    style={{ animationDelay: `${0.1 * (idx % 3)}s` }}
                  >
                    <ProjectCard 
                      project={project} 
                      onClick={setSelectedProject} 
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-gray-500 text-xl">No projects found matching your criteria.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveFilter('All');}}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Works Footer */}
            <div className="mt-32 pt-12 border-t border-white/5 text-center">
               <h3 className="text-2xl font-bold text-white mb-4">Want to see more?</h3>
               <p className="text-gray-400 mb-8">Check out my code contributions directly on GitHub.</p>
               <a 
                 href={GITHUB_URL}
                 target="_blank"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all"
               >
                 <Github size={20} /> Visit GitHub Profile
               </a>
            </div>

          </div>
        </main>
      )}

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