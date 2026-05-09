import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';

@Component({
  selector: 'app-skeleton-item',
  imports: [HlmSkeleton, HlmItemImports, HlmButtonImports],
  template: `
    <a hlmItem variant="muted">
      <div hlmItemContent>
        <div class="flex w-full max-w-xs flex-col gap-2">
          <hlm-skeleton class="h-4 w-full" />
          <hlm-skeleton class="h-4 w-3/4" />
        </div>
      </div>
    </a>
  `,
  styles: ``,
})
export class SkeletonItem {}
