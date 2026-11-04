import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { ShellSidebar } from './sidebar';
import { ShellStateService } from '../shell-state.service';

describe('ShellSidebar', () => {
  beforeEach(async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );
    await TestBed.configureTestingModule({
      imports: [ShellSidebar],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => vi.unstubAllGlobals());

  it('moves focus into the panel when it opens on mobile', async () => {
    const fixture = TestBed.createComponent(ShellSidebar);
    const state = TestBed.inject(ShellStateService);
    fixture.detectChanges();

    state.openMobile();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(document.activeElement?.getAttribute('aria-label')).toBe('Close navigation');
  });

  it('links to the public site from the footer', () => {
    const fixture = TestBed.createComponent(ShellSidebar);
    fixture.detectChanges();

    const link = (fixture.nativeElement as HTMLElement).querySelector('a[href="/"]');
    expect(link?.textContent).toContain('Public site');
  });
});
