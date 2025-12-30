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
  new Project (
    1,
    'AWS S3 Microservice API',
    'Fullstack Developer',
    '',
    [
      `Provide an alternative to the current flow of file management request tasks. 
       Enabled storage cost mitigation.`
    ],
    ['CSharp', 'Swagger',],
    ''
  ),

  new Project(
    2,
    'QR Code Scanner',
    'Feature Developer',
    '',
    [
      `Implemented DMZ to intranet communication, to enable processing QR images to backend.`,
    ],
    ['CSharp', 'Swagger', 'Angular', 'TypeScript'],
    ''
  ),

  new Project(
    3,
    'Project Request Management',
    'Fullstack Developer',
    "",
    [
      "Client's one-stop-shop in handling project requests, along with upload and download features.",
    ],
    ['CSharp', 'Swagger', 'Angular', 'TypeScript'],
    ''
  ),
  
  new Project(
    4,
    'BOM Management ',
    'Fullstack Developer',
    '',
    [
      `Display bill of materials data across a number of tables with CRUD functionality.`
    ],
    ['CSharp', 'Swagger', 'Angular', 'TypeScript'],
    ''
  ),

]