import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExperienceTimeline } from '../../core';
import { Timeline } from './timeline';

describe('Timeline', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  const base: ExperienceTimeline = {
    id: 1,
    company: { name: 'Acme' },
    duration: { startedAt: '2020-01-01', finishedAt: '', duration: '' },
    description: 'Built things',
    role: { value: 'Engineer' },
    responsibility: 'Shipped features',
    type: 'Full-time',
    projects: null,
  };

  async function render(payload: ExperienceTimeline[]): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(Timeline);
    fixture.detectChanges();

    http.expectOne((request) => request.url.includes('v1/experience')).flush(payload);

    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();

    return fixture.nativeElement as HTMLElement;
  }

  it('renders the start year only when the date is valid', async () => {
    const element = await render([
      base,
      { ...base, id: 2, duration: { ...base.duration, startedAt: 'not-a-date' } },
    ]);

    expect(element.textContent).toContain('2020');
    expect(element.querySelectorAll('.tabular-nums').length).toBe(1);
    expect(element.textContent).not.toContain('Invalid');
    expect(element.textContent).not.toContain('NaN');
  });

  it('renders nested projects and tech chips', async () => {
    const element = await render([
      {
        ...base,
        projects: [
          {
            projectId: 9,
            projectName: 'Portal',
            description: 'Internal dashboard',
            coverImg: '',
            duration: 0,
            contribution: '',
            techStackSpecs: [
              {
                specId: 1,
                toolName: 'Angular',
                imgSrc: '',
                createdAt: '',
                stackId: 1,
                stack: 'Frontend',
              },
            ],
          },
        ],
      },
    ]);

    expect(element.textContent).toContain('Portal');
    expect(element.textContent).toContain('Angular');
  });

  it('shows an empty state when there is no experience', async () => {
    const element = await render([]);

    expect(element.querySelector('[role="status"]')?.textContent).toContain('No experience');
    expect(element.querySelectorAll('li').length).toBe(0);
  });
});
