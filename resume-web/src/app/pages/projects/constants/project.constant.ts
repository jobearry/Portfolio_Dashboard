import { Project } from '../types/project.type';

export const PROJECT_HIGHLIGHT: Project[] = [
  {
    id: 1,
    title: 'AWS S3 Microservice',
    duration: '',
    contribution:
      `A microservice on top of AWS S3 with a JWT based auth scoped to specific directories.`,
    tags: ['C#', 'ASP.NET', "Swagger", 'AWS'],
    link: '',
  },

  {
    id: 2,
    title: 'BOM Management System',
    duration: '',
    contribution:
      `An internal dashboard for bill of materials across a number of projects.`,
    tags: ['C#', 'ASP.NET', 'Angular', 'TypeScript', 'Entity Framework', 'TailwindCSS', 'IgniteUI', 'JWT', 'AWS', 'NgRx'],
    link: '',
  },

  {
    id: 3,
    title: 'Construction Dashboard',
    duration: '',
    contribution:
      `A public dashboard for keeping track of construction site data.`,
    tags: ['C#', 'ASP.NET', "AWS", 'Angular', 'TypeScript', 'Angular Signals', 'Entity Framework'],
    link: ''
  },
  {
    id: 4,
    title: 'Project Management System',
    duration: '',
    contribution:
      `An internal dashboard for managing client requests.`,
    tags: ['C#', 'ASP.NET', 'Angular', 'TypeScript', 'Entity Framework', 'TailwindCSS', 'IgniteUI', 'JWT', 'AWS'],
    link: ''
  },
  {
    id: 5,
    title: 'Thermal Camera Viewer',
    duration: '',
    contribution:
      `A public thermal camera viewer that uses html canvas for displaying thermal image data.`,
    tags: ['Angular', 'MongoDB', "C#", 'ASP.NET', 'TypeScript'],
    link: ''
  },
];
