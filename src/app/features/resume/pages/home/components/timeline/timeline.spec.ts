import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Timeline } from './timeline';

describe('Resume Timeline', () => {
  let http: HttpTestingController;

  const experiencesRequest = () =>
    http.expectOne((request) => request.url.endsWith('/v1/experience'));

  const render = () => {
    const fixture = TestBed.createComponent(Timeline);
    fixture.detectChanges();
    return fixture;
  };

  const settle = async (fixture: ReturnType<typeof render>) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();
  };

  const experience = (id: number, company: string, role: string) => ({
    id,
    company,
    description: 'This detail should not appear',
    durationMonths: 12,
    finishedAt: null,
    responsibility: 'This responsibility should not appear',
    role,
    startedAt: '2024-01-01',
    type: 'Full time',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads experiences and displays only company names and roles', async () => {
    const fixture = render();
    experiencesRequest().flush([
      experience(1, 'Acme', 'Software Engineer'),
      experience(2, 'Globex', 'Developer'),
    ]);

    await settle(fixture);

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Acme');
    expect(element.textContent).toContain('Software Engineer');
    expect(element.textContent).toContain('Globex');
    expect(element.textContent).toContain('Developer');
    expect(element.textContent).toContain('2024');
    expect(element.textContent).not.toContain('This detail should not appear');
    expect(element.textContent).not.toContain('This responsibility should not appear');
    expect(element.textContent).not.toContain('Full time');
    expect(element.querySelector('h3')?.classList.contains('text-accent-brand')).toBe(true);
  });

  it('shows a loading state while the request is pending', () => {
    const fixture = render();

    expect((fixture.nativeElement as HTMLElement).querySelector('app-skeleton')).not.toBeNull();
    experiencesRequest().flush([]);
  });

  it('shows an empty state when the API returns no experiences', async () => {
    const fixture = render();
    experiencesRequest().flush([]);

    await settle(fixture);

    expect(
      (fixture.nativeElement as HTMLElement).querySelector('[role="status"]')?.textContent,
    ).toContain('No experience has been published');
  });

  it('shows an error and retries the experience request', async () => {
    const fixture = render();
    experiencesRequest().flush('boom', { status: 503, statusText: 'Unavailable' });

    await settle(fixture);

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[role="alert"]')?.textContent).toContain('503');
    (element.querySelector('[role="alert"] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    experiencesRequest().flush([experience(1, 'Acme', 'Software Engineer')]);

    await settle(fixture);

    expect(element.textContent).toContain('Acme');
    expect(element.textContent).toContain('Software Engineer');
  });
});
