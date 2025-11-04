import { Project } from "./project.model"

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
    'Overtime Filing',
    'Feature Developer',
    '1 month',
    'Added overtime checker to distinguish an actual overtime from a late overtime.',
    ['#csharp', '#dotnet', '#excel-library'],
    ''
  ),
  
  new Project(
    2,
    'Progress Management',
    'Fullstack Developer',
    '2 weeks',
    `Setup QR Scanner component that displays a snapshot of the scanned QR image, 
     and enables users to cherry pick successfully scanned images and save to database.`,
    ['#csharp', '#asp-dotnet', '#angular', '#igniteui'],
    ''
  ),

  // new Project(
  //   3,
  //   'Progress Management',
  //   'Fullstack Developer',
  //   '2 weeks',
  //   `Setup QR Scanner component that displays a snapshot of the scanned QR image, 
  //    and enables users to cherry pick successfully scanned images and save to database.`,
  //   ['#csharp', '#asp-dotnet', '#angular', '#igniteui'],
  //   ''
  // ),
]