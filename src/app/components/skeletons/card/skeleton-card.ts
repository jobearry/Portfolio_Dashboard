import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmCard, HlmCardImports } from "@spartan-ng/helm/card";
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';

@Component({
  selector: 'app-skeleton-card',
  imports: [HlmSkeletonImports, HlmCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: "mx-auto w-full max-w-sm flex flex-col justify-between"
	},
  template: `
    <hlm-card size="sm" class="mx-auto w-full max-w-sm flex flex-col justify-between">
			<hlm-card-header>
				<hlm-skeleton class="h-4 w-2/3" />
				<hlm-skeleton class="h-4 w-1/2" />
			</hlm-card-header>
			<div hlmCardContent>
				<hlm-skeleton class="aspect-video w-full" />
			</div>
		</hlm-card>
  `,
  styles: ``,
})
export class SkeletonCard {

}
