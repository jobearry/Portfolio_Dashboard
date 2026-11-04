import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecentRepositories } from './recent-repositories';

describe('RecentRepositories', () => {
  let http: HttpTestingController;

  const request = () => http.expectOne((req) => req.url.endsWith('/repositories'));

  const render = () => {
    const fixture = TestBed.createComponent(RecentRepositories);
    fixture.detectChanges();
    return fixture;
  };

  const settle = async (fixture: ReturnType<typeof render>) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();
  };

  const repository = (id: number) => ({
    id,
    name: `repo-${id}`,
    fullName: `jobearry/repo-${id}`,
    htmlUrl: `https://github.com/jobearry/repo-${id}`,
    description: `Description ${id}`,
    language: 'TypeScript',
    topics: [],
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });

    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('shows only the first two repositories returned by the API', async () => {
    const fixture = render();
    request().flush([repository(1), repository(2), repository(3)]);

    await settle(fixture);

    const element = fixture.nativeElement as HTMLElement;
    expect(
      [...element.querySelectorAll('li h3')].map((heading) => heading.textContent?.trim()),
    ).toEqual(['repo-1', 'repo-2']);
  });

  it('shows an empty message when no repositories are returned', async () => {
    const fixture = render();
    request().flush([]);

    await settle(fixture);

    expect(
      (fixture.nativeElement as HTMLElement).querySelector('[role="status"]')?.textContent,
    ).toContain('No public repositories');
  });

  it('shows an error and retries the repository request', async () => {
    const fixture = render();
    request().flush('boom', { status: 503, statusText: 'Unavailable' });

    await settle(fixture);

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[role="alert"]')?.textContent).toContain('503');
    (element.querySelector('[role="alert"] button') as HTMLButtonElement).click();
    fixture.detectChanges();
    request().flush([repository(1)]);

    await settle(fixture);

    expect(element.querySelector('li h3')?.textContent?.trim()).toBe('repo-1');
  });
});
