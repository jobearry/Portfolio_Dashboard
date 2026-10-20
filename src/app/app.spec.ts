import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App shell', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the shell and the routed page for /dashboard', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/dashboard');
    await fixture.whenStable();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-shell-sidebar')).toBeTruthy();
    expect(element.querySelector('app-shell-header')).toBeTruthy();
    expect(router.url).toBe('/dashboard');
  });

  it('redirects unknown paths to /dashboard', async () => {
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/does-not-exist');

    expect(router.url).toBe('/dashboard');
  });

  it('redirects the empty path to /dashboard', async () => {
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/');

    expect(router.url).toBe('/dashboard');
  });

  it('keeps every live route reachable', async () => {
    const router = TestBed.inject(Router);

    for (const path of ['/timeline', '/profile', '/blog']) {
      await router.navigateByUrl(path);
      expect(router.url).toBe(path);
    }
  });

  it('derives the header title from the active route', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/timeline');
    await fixture.whenStable();
    fixture.detectChanges();

    const heading = (fixture.nativeElement as HTMLElement).querySelector('header h1');
    expect(heading?.textContent?.trim()).toBe('Timeline');
  });

  it('marks the active sidebar link with aria-current', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/blog');
    await fixture.whenStable();
    fixture.detectChanges();

    const active = (fixture.nativeElement as HTMLElement).querySelector('a[aria-current="page"]');
    expect(active?.textContent).toContain('Blog');
  });
});
