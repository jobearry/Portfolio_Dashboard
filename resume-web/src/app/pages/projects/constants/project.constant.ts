import { Project } from '../types/project.type';

export const PROJECT_HIGHLIGHT: Project[] = [
  {
    id: 1,
    title: 'AWS S3 Microservice',
    duration: '',
    contribution:
      `A microservice on top of AWS S3 with upload, download, and list endpoints, with a JWT based
       auth scoped to specific directories.`,
    tags: ['C#', 'ASP.NET', "Swagger"],
    link: '',
  },

  {
    id: 2,
    title: 'Project Request Management',
    duration: '',
    contribution:
      `Migrated a legacy full stack web app for modernization. Identified EC2 as expensive file storage as per
       client complaint, that led to creating an AWS S3 Microservice enabling mitigation of cost.`,
    tags: ['C#', 'ASP.NET', "Swagger", 'Angular', 'TypeScript'],
    link: '',
  },

  {
    id: 3,
    title: 'Construction Dashboard',
    duration: '',
    contribution:
      `Responsible for setting up as a greenfield project and built a QR scanner component as POC
       and delivered the features with workarounds on real infrastructure constraints. `,
    tags: ['C#', 'ASP.NET', "Swagger", 'Angular', 'TypeScript'],
    link: ''
  },
];
