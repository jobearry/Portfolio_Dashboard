export class Project {
  constructor(
    public id: number,
    public title: string,
    public role: string,
    public duration: string,
    public contirbution: string[],
    public tags: string[],
    public link?: string,
  ){}
}

export const corpoProjects: Project[] = [
  new Project(
    1,
    'Project Management',
    'Fullstack Developer',
    '2 months',
    [
      "Migrated a monolithic .NET Framework app to a modern Angular-based web application.",
      // "Enhanced route navigation for project input modules, improving user experience and browsing efficiency.",
      // "Implemented a responsive sidebar component to enable intuitive navigation and advanced filtering options."
    ],
    ['CSharp', 'DotNetCore', 'Swagger', 'Angular', 'IgniteUI'],
    ''
  ),
  
  new Project(
    2,
    'Progress Management',
    'Fullstack Developer',
    '2 weeks',
    [
      // "Setup QR Scanner component that captures and displays snapshots of scanned QR codes.",
      "Enables users to selectively review and save successfully scanned QR images."
    ],
    ['CSharp', 'DotNetCore', 'Angular', 'IgniteUI', 'zxing'],
    ''
  ),

  new Project (
    3,
    'AWS S3 Integration',
    'Fullstack Developer',
    '2 weeks',
    [
      "Integrated AWS S3 as file storage across multiple systems to mitigate cloud storage costs. "
    ],
    ['CSharp', 'DotNetCore', 'Swagger'],
    ''
  ),
]