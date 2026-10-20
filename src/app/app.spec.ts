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
    expect(element.querySelector('app-sidebar')).toBeTruthy();
    expect(router.url).toBe('/dashboard');
  });

  it('redirects unknown paths to /dashboard', async () => {
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/does-not-exist');

    expect(router.url).toBe('/dashboard');
  });

  it('keeps every live route reachable', async () => {
    const router = TestBed.inject(Router);

    for (const path of ['/timeline', '/profile', '/blog']) {
      await router.navigateByUrl(path);
      expect(router.url).toBe(path);
    }
  });
});
