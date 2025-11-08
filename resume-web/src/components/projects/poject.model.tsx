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
// export const projects: Project[] = [
//   new Project(
//     1,
//     ['#react', '#tailwindcss'],
//     'Todo List',
//     'Simple to do list app built with React',
//     'https://jb-todo-list.vercel.app/'
//   ),
//   new Project(
//     2,
//     ['#angular', '#aspnet', '#bootstrap'],
//     'Employee Management',
//     'Employee management system built with Angular and ASP.NET WebAPI (+Bootsrap)',
//     'https://ng-employee-management.vercel.app/'
//   )
// ]

export const sdmiProjects: Project[] = [
  new Project(
    1,
    'Project Request Management',
    'Fullstack Developer',
    '2 months',
    [
      "Migrated a legacy monolithic .NET Framework app to a modern Angular-based web application.",
      "Enhanced route navigation for project input modules, improving user experience and browsing efficiency.",
      "Implemented a responsive sidebar component to enable intuitive navigation and advanced filtering options."
    ],
    ['#csharp', '#asp-dotnet', '#swagger', '#angular', '#igniteui'],
    ''
  ),
  
  new Project(
    2,
    'Progress Management',
    'Fullstack Developer',
    '2 weeks',
    [
      "Setup QR Scanner component that captures and displays snapshots of scanned QR codes.",
      "Enables users to selectively review and save successfully scanned images to the database."
    ],
    ['#csharp', '#asp-dotnet', '#angular', '#igniteui', '#zxing-library'],
    ''
  ),

  // new Project(
  //   3,
  //   'Progress Management',
  //   'Fullstack Developer',
  //   '2 weeks',
  //   [
  //     "Migrated a legacy monolithic .NET Framework app to a modern Angular-based web application.",
  //     "Enhanced route navigation for project input modules, improving user experience and browsing efficiency.",
  //     "Implemented a responsive sidebar component to enable intuitive navigation and advanced filtering options."
  //   ],
  //   ['#csharp', '#asp-dotnet', '#angular', '#igniteui'],
  //   ''
  // ),
]