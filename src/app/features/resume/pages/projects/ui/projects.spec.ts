import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { site } from '../../../../../core/config/site.config';
import { Projects } from './projects';

describe('Projects', () => {
  let http: HttpTestingController;

  const projectRequest = () =>
    http.expectOne((request) => request.url.endsWith('/v1/project?includeTools=true'));

  const githubRequest = () =>
    http.expectOne((request) =>
      request.url.endsWith(`/v1/github/owner/${site.github.username}/repositories`),
    );

  const render = () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    return fixture;
  };

  const settle = async (fixture: ReturnType<typeof render>) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });

    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('renders project names, contributions, and included tools from the API', async () => {
    const fixture = render();

    projectRequest().flush([
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
    ]);
    githubRequest().flush([]);

    await settle(fixture);

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Portal');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Delivered the portal');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Angular');
  });

  it('renders an empty state when the API returns no projects', async () => {
    const fixture = render();
    projectRequest().flush([]);
    githubRequest().flush([]);

    await settle(fixture);

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'No client projects to show yet.',
    );
  });

  it('shows a retry action when loading projects fails', async () => {
    const fixture = render();
    projectRequest().flush('boom', { status: 503, statusText: 'Unavailable' });
    githubRequest().flush([]);

    await settle(fixture);

    const button = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="alert"] button',
    ) as HTMLButtonElement;
    expect(button?.textContent).toContain('Try again');

    button.click();
    fixture.detectChanges();
    projectRequest().flush([]);
    await settle(fixture);

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'No client projects to show yet.',
    );
  });
});
