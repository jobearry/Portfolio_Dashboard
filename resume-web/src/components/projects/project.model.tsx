export class Project {
  constructor(
    public id: number,
    public title: string,
    public role: string,
    public duration: string,
    public description: string,
    public tags: string[],
    public link?: string,
  ){}
}