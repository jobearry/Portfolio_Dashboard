import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ResumeProjectSignalService } from './project.service';

describe('ResumeProjectSignalService', () => {
  let service: ResumeProjectSignalService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ResumeProjectSignalService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads projects with their tools from the portfolio API', async () => {
    const projects = [
      {
        projectId: 7,
        projectName: 'Portal',
        description: 'Client portal',
        coverImg: '',
        duration: 12,
        contribution: 'Delivered the portal',
        techStackSpecs: [
          {
            specId: 4,
            toolName: 'Angular',
            imgSrc: '',
            createdAt: '',
            stackId: 2,
            stack: 'Frontend',
          },
        ],
      },
    ];

    const request = service.load();

    http.expectOne((req) => req.url.endsWith('/v1/project?includeTools=true')).flush(projects);
    await request;

    expect(service.getState()).toEqual({
      content: projects,
      loading: false,
      error: null,
    });
  });
});
