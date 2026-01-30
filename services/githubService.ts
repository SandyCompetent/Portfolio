import { Project } from '../types';

// Add repository names here that you want to hide from the portfolio
const BLOCKED_REPOS = [
  'test', 
  'hello-world', 
  'learning-repo', 
  'temp',
  'notes',
  'practice' 
];

export const fetchGitHubRepos = async (): Promise<Project[]> => {
  try {
    // Fetch latest 15 repositories to ensure we have enough after filtering
    const response = await fetch('https://api.github.com/users/SandyCompetent/repos?sort=updated&direction=desc&per_page=15&type=owner');
    
    if (!response.ok) {
      console.warn("GitHub API limit reached or error");
      return [];
    }

    const data = await response.json();
    
    const projects: Project[] = data
      .filter((repo: any) => {
        const isFork = repo.fork;
        const isBlocked = BLOCKED_REPOS.some(blocked => repo.name.toLowerCase().includes(blocked));
        return !isFork && !isBlocked;
      })
      .map((repo: any) => {
        // Use repo topics for tech stack, fallback to language
        const stack = repo.topics && repo.topics.length > 0 
          ? repo.topics 
          : (repo.language ? [repo.language] : ['GitHub']);

        return {
          id: `gh-${repo.id}`,
          title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '), // Humanize title
          description: 'Open Source Contribution',
          valueProposition: repo.description || 'A useful utility or application component.',
          achievement: `${repo.stargazers_count} Stars • ${repo.forks_count} Forks`,
          techStack: stack,
          // Use GitHub's auto-generated social image for the repo
          imageUrl: `https://opengraph.githubassets.com/1/${repo.full_name}`,
          repoUrl: repo.html_url,
          demoUrl: repo.homepage,
          details: `
            Fetched dynamically from GitHub.
            Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}
            
            ${repo.description || ''}
            
            Check out the code directly on GitHub to see the latest commits and implementation details.
          `
        };
      });

    return projects;
  } catch (e) {
    console.error("Failed to fetch GitHub repos", e);
    return [];
  }
};