import type { CommitData } from "@/lib/types/commits.type";
import type { Project } from "@/lib/types/project.type";
import { GithubService } from "@/services/github-service";
import { create } from "zustand";

const githubService = new GithubService();
// github-store.ts
interface GithubRepoState {
  githubRepos: Project[];
  yearlyCommits: { // Changed from monthlyCommits
    [year: string]: { // Key by year: "2024", "2025", etc.
      commits: CommitData[];
      total: number;
    }
  };
  loading: boolean;
  commitsLoading: boolean;
  currentYear: string; // Track which year we're showing
  getRepos: () => Promise<void>;
  getYearlyCommits: (year?: number) => Promise<void>; // Changed from getBothMonthsCommits
  clearCommits: () => void;
}

export const useGithubStore = create<GithubRepoState>((set, get) => ({
  githubRepos: [],
  yearlyCommits: {}, // Store commits by year
  loading: false,
  commitsLoading: false,
  currentYear: new Date().getFullYear().toString(),

  getRepos: async () => {
    set({ loading: true });
    try {
      const data = await githubService.getRepos();
      set({ githubRepos: data });
    } catch (err) {
      console.error("Error fetching repos: ", err);
    } finally {
      set({ loading: false });
    }
  },

  getYearlyCommits: async (year?: number) => {
    const targetYear = year || new Date().getFullYear();
    const yearKey = targetYear.toString();
    
    // Check if we already have data for this year
    const state = get();
    if (state.yearlyCommits[yearKey] && state.currentYear === yearKey) {
      console.log(`Already have commits for ${yearKey}, skipping fetch`);
      return;
    }
    
    set({ commitsLoading: true, currentYear: yearKey });
    
    try {
      const allCommits: CommitData[] = [];
      const repos = state.githubRepos;
      
      console.log(`🚀 Fetching commits for year ${yearKey} from ${repos.length} repos`);
      
      // Process in batches
      const batchSize = 2; // Reduced for better rate limit management
      
      for (let i = 0; i < repos.length; i += batchSize) {
        const batch = repos.slice(i, i + batchSize);
        
        const batchPromises = batch.map(async (repo) => {
          try {
            // Use yearly commit fetching
            const commits = await githubService.getYearlyCommits(
              repo,
              'jobearry', // Your username
              targetYear
            );
            console.log(`✅ ${repo.title}: ${commits.length} commits`);
            return commits;
          } catch (error) {
            console.error(`Failed for ${repo.title}:`, error);
            return [];
          }
        });
        
        const batchResults = await Promise.all(batchPromises);
        batchResults.forEach(commits => {
          allCommits.push(...commits);
        });
        
        console.log(`Batch ${Math.floor(i/batchSize) + 1}: Processed ${Math.min(i + batchSize, repos.length)}/${repos.length} repos`);
        
        if (i + batchSize < repos.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // Sort by date (newest first)
      allCommits.sort((a, b) => 
        new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
      );
      
      set(state => ({
        yearlyCommits: {
          ...state.yearlyCommits,
          [yearKey]: {
            commits: allCommits,
            total: allCommits.length
          }
        }
      }));
      
      console.log(`✅ Fetched ${allCommits.length} commits for ${yearKey}`);
      
    } catch (err) {
      console.error(`❌ Error fetching commits for ${yearKey}:`, err);
    } finally {
      set({ commitsLoading: false });
    }
  },

  clearCommits: () => {
    set({ yearlyCommits: {}, currentYear: '' });
  }
}));