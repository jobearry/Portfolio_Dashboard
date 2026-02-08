export interface Project {
  id: number,
  title: string,
  role: string,
  duration: string,
  contribution: string[],
  tags: string[],
  link?: string,
  language?: string,
  updated_at?: string,
  commits_url?: string
}