import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmSkeleton } from "@spartan-ng/helm/skeleton";

@Component({
  selector: 'app-skeleton-item',
  imports: [HlmSkeleton, HlmItemImports, HlmButtonImports],
  templateUrl: './skeleton-item.html',
  styles: ``,
})
export class SkeletonItem {

}
