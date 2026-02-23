/**
 * GitHub API utilities for fetching repository data
 */

export interface RepoData {
  updated: boolean;
  lastCommitDate?: string;
}

/**
 * Extract owner and repo from GitHub URL
 */
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

/**
 * Check if a repository has been updated in the last N days
 */
export async function checkRepoActivity(
  githubUrl: string,
  daysThreshold: number = 30
): Promise<RepoData> {
  const parsed = parseGitHubUrl(githubUrl);
  
  if (!parsed) {
    return { updated: false };
  }
  
  const { owner, repo } = parsed;
  
  try {
    // Use GitHub API without token (public repos only)
    // Note: Limited to 60 requests per hour without authentication
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App',
        },
      }
    );
    
    if (!response.ok) {
      console.warn(`Failed to fetch ${owner}/${repo}: ${response.status}`);
      return { updated: false };
    }
    
    const commits = await response.json();
    
    if (!Array.isArray(commits) || commits.length === 0) {
      return { updated: false };
    }
    
    const lastCommitDate = commits[0]?.commit?.committer?.date;
    
    if (!lastCommitDate) {
      return { updated: false };
    }
    
    const lastCommit = new Date(lastCommitDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastCommit.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      updated: diffDays <= daysThreshold,
      lastCommitDate: lastCommitDate,
    };
  } catch (error) {
    console.error(`Error checking repo ${owner}/${repo}:`, error);
    return { updated: false };
  }
}

/**
 * Batch check multiple repositories
 */
export async function checkMultipleRepos(
  repos: { id: string; githubUrl: string }[]
): Promise<Map<string, RepoData>> {
  const results = new Map<string, RepoData>();
  
  // Process sequentially to avoid rate limiting
  for (const repo of repos) {
    if (repo.githubUrl) {
      const data = await checkRepoActivity(repo.githubUrl);
      results.set(repo.id, data);
      
      // Small delay to be nice to the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
}
