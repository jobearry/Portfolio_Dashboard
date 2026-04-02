import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TRANSITION_MOVE_UP } from '../../../../shared/constants/styles.constants';
import { LucideAngularModule } from 'lucide-angular';
import { Marquee } from "../../../../components/marquee/marquee";
import { TechStack } from "../tech-stack/tech-stack";
import { ThemeToggler } from "../../../../components/theme-toggler";

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, ThemeToggler],
  templateUrl: './profile.html',
  styles: [`.profile-filter-light { filter: brightness(1.06) saturate(1.05) contrast(1.02); }`],
})
// Add theme-aware image swapping using Angular lifecycle hooks
export class Profile implements OnInit, OnDestroy {
  TRANSITION_MOVE_UP = TRANSITION_MOVE_UP;
  constructor(private cdr: ChangeDetectorRef) {}

  // Image sources — update paths if you keep assets elsewhere
  darkSrc = '/profile_dark.png';
  // Point to a light variant; created placeholder at /profile_light.svg
  lightSrc = '/profile.png';

  // Bound to the template img[src]
  imgSrc = this.darkSrc;

  // When true, apply a gentle filter to the dark image in light mode if no light image exists
  useFilter = false;

  private mo?: MutationObserver;

  ngOnInit(): void {
    this.applyTheme();
    // observe theme changes on <html>
    this.mo = new MutationObserver(() => this.applyTheme());
    this.mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  }

  ngOnDestroy(): void {
    this.mo?.disconnect();
  }

  private currentTheme(): 'dark' | 'light' {
    const ds = document.documentElement.dataset as DOMStringMap;
    const dt = ds['theme'];
    return (dt as any) || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }

  private applyTheme(): void {
    const theme = this.currentTheme();
    if (theme === 'light' && this.lightSrc) {
      this.trySetSrc(this.lightSrc);
    } else {
      this.useFilter = false;
      this.imgSrc = this.darkSrc;
    }
  }

  // Test the candidate src before committing it to avoid broken images
  private trySetSrc(candidate: string): void {
    const tester = new Image();
    tester.onload = () => { setTimeout(() => { this.useFilter = false; this.imgSrc = candidate; this.cdr.detectChanges(); }); };
    tester.onerror = () => { setTimeout(() => { this.useFilter = true; this.imgSrc = this.darkSrc; this.cdr.detectChanges(); }); };
    tester.src = candidate;
  }

  // Template error handler fallback
  onImgError(): void {
    this.useFilter = false;
    this.imgSrc = this.darkSrc;
  }
}
