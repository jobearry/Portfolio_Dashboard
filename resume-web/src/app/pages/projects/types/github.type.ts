export interface GithubRepo{
  id: number,
  name: string,
  full_name: string,
  private: boolean,
  language: string,
  html_url: string,
  topics: string[],
  description: string,
}