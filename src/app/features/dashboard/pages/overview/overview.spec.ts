import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { site } from '../../../../core/config/site.config';
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
    expect(element.querySelector('app-skeleton')).toBeNull();
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

  it('renders an informational metric card with its subtitle and no action button', async () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();

    http
      .expectOne((req) => req.url.endsWith('/v1/overview'))
      .flush([{ key: 'projects', count: 3 }]);

    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const card = element.querySelector('article');
    expect(card).not.toBeNull();
    expect(card?.textContent).toContain('PROJECTS');
    expect(card?.textContent).toContain('Selected work and portfolio projects');
    expect(card?.textContent).toContain('3');
    expect(card?.querySelector('button')).toBeNull();
    expect(element.querySelector('app-skeleton')).toBeNull();
    expect(element.querySelector('header')?.textContent).toContain(site.profile.name);
    expect(
      element.querySelector('article')?.parentElement?.classList.contains('max-w-[56rem]'),
    ).toBe(true);
  });

  it('renders dynamic metric keys in uppercase with key-derived subtitle copy', async () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();

    http
      .expectOne((req) => req.url.endsWith('/v1/overview'))
      .flush([{ key: 'open_roles', count: 2 }]);

    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('article') as HTMLElement;
    expect(card.querySelector('h3')?.textContent).toContain('OPEN_ROLES');
    expect(card.textContent).toContain('Overview of open roles');
  });

  it('renders a matching subtitle for each known overview metric', async () => {
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();

    http
      .expectOne((req) => req.url.endsWith('/v1/overview'))
      .flush([
        { key: 'projects', count: 5 },
        { key: 'skills', count: 21 },
        { key: 'recommendations', count: 2 },
      ]);

    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();

    const subtitles = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('article p.text-sm'),
    ).map((subtitle) => subtitle.textContent?.trim());
    expect(subtitles).toEqual([
      'Selected work and portfolio projects',
      'Technologies and tools in my toolkit',
      'Feedback from people I have worked with',
    ]);
  });
});
