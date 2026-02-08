import type { Project } from "../types/project.type";

export const corpoProjects: Project[] = [
  {
    id: 1,
    title: 'AWS S3 Microservice API',
    role: 'Fullstack Developer',
    duration: '',
    contribution: [
      `Provide an alternative to the current flow of file management request tasks. 
       Enabled storage cost mitigation.`
    ],
    tags: ['CSharp', 'Swagger'],
    link: ''
  },

  {
    id: 2,
    title: 'QR Code Scanner',
    role: 'Feature Developer',
    duration: '',
    contribution: [
      `Implemented DMZ to intranet communication, to enable processing QR images to backend.`,
    ],
    tags: ['CSharp', 'Swagger', 'Angular', 'TypeScript'],
    link: ''
  },

  {
    id: 3,
    title: 'Project Request Management',
    role: 'Fullstack Developer',
    duration: "",
    contribution: [
      "Client's one-stop-shop in handling project requests, along with upload and download features.",
    ],
    tags: ['CSharp', 'Swagger', 'Angular', 'TypeScript'],
    link: ''
  },
  
  {
    id: 4,
    title: 'BOM Management',
    role: 'Fullstack Developer',
    duration: '',
    contribution: [
      `Display bill of materials data across a number of tables with CRUD functionality.`
    ],
    tags: ['CSharp', 'Swagger', 'Angular', 'TypeScript'],
    link: ''
  },
]