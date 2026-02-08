import type { CommitData } from "@/lib/types/commits.type";
import type { Project } from "@/lib/types/project.type";
import axios from "axios";

interface GitHubRepo {
  id: number;
  name: string;
  languages_url: string;
  description: string;
  html_url: string;
  commits_url: string;
}

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

export class GithubService {
  async getRepos() {
    const response = await api.get("/users/jobearry/repos");
    console.log("🚀 ~ GithubService ~ getRepos ~ response:", response.data);
    const projects: Project[] = response.data.map(async (x: GitHubRepo) => {
      const langs = await api.get(x.languages_url);
      return {
        id: x.id,
        title: x.name,
        role: "",
        duration: "",
        contirbution: [x.description], // Using your interface's property name
        tags: Object.keys(langs.data).map((lang) => {
          if (lang.includes("#")) {
            return lang.replace("#", "sharp");
          }
          if (lang === "HTML") {
            return "html5";
          }
          if (lang === "CSS") {
            return "css3";
          }
          return lang.replace(/\d+/g, "");
        }),
        link: x.html_url,
        commits_url: x.commits_url,
      };
    });

    return Promise.all<Project[]>(projects);
  }

  // github-service.ts
  async getYearlyCommits(
    repo: Project,
    username: string,
    year: number,
  ): Promise<CommitData[]> {
    // Set date range for entire year
    const since = `${year}-01-01T00:00:00Z`;
    const until = `${year}-12-31T23:59:59Z`;

    try {
      const url = `/repos/${username}/${repo.title}/commits?since=${since}&until=${until}&per_page=100`;
      console.log(`📅 Fetching commits for ${repo.title} - year ${year}`);

      const response = await api.get(url);

      // GitHub returns empty array for no commits, 409 for empty repo
      if (response.status === 409 || response.status === 404) {
        console.log(`📭 ${repo.title} is empty or not found`);
        return [];
      }

      if (response.status !== 200) {
        console.error(`HTTP ${response.status} for ${repo.title}`);
        return [];
      }

      // Check if data is an array
      if (!Array.isArray(response.data)) {
        console.error(`Invalid response for ${repo.title}`);
        return [];
      }

      const commits: CommitData[] = response.data;

      // Log rate limit
      const remaining =
        response.headers?.["x-ratelimit-remaining"] || "unknown";
      console.log(
        `📊 ${repo.title}: ${commits.length} commits (rate limit: ${remaining})`,
      );

      return commits;
    } catch (error) {
      console.error(`❌ Error for ${repo.title}:`, error);
      return [];
    }
  }
}
