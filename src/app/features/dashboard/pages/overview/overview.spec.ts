import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Overview } from './overview';

describe('Overview', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('renders a retryable error instead of a stuck skeleton when the request fails', async () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();

    http
      .expectOne((req) => req.url.endsWith('/v1/overview'))
      .flush('boom', { status: 500, statusText: 'Server Error' });

    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-skeleton-item')).toBeNull();
    expect(element.querySelector('[role="alert"]')?.textContent).toContain('500');
    expect(element.querySelector('button')?.textContent).toContain('Try again');
  });

  it('renders an empty state when the API returns no metrics', async () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();

    http.expectOne((req) => req.url.endsWith('/v1/overview')).flush([]);

    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[role="status"]')?.textContent).toContain('No overview metrics');
    expect(element.querySelector('article')).toBeNull();
  });

  it('renders one informational card per metric with no action button', async () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();

    http
      .expectOne((req) => req.url.endsWith('/v1/overview'))
      .flush([{ title: 'projects', subtitle: 'Delivered', count: 3, description: 'Across teams' }]);

    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const card = element.querySelector('article');
    expect(element.querySelectorAll('article').length).toBe(1);
    expect(card?.textContent).toContain('PROJECTS');
    expect(card?.textContent).toContain('3');
    expect(card?.querySelector('button')).toBeNull();
    expect(element.querySelector('app-skeleton-item')).toBeNull();
  });
});
