export interface Project {
  id: number,
  title: string,
  subtitle?: string,
  duration?: string,
  contribution: string,
  tags: string[],
  link?: string,
}
