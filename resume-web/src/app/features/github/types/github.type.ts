export interface GithubRepo{
  id: number,
  name: string,
  full_name: string,
  private: boolean,
  owner?: {
    login: string;
  };
  language: string,
  html_url: string,
  topics: string[],
  description: string,
}

export interface GithubCommit {
  commit?: {
    author?: {
      date?: string | null;
    } | null;
  } | null;
  author?: {
    date?: string | null;
  } | null;
  committer?: {
    date?: string | null;
  } | null;
  _repo?: string;
}