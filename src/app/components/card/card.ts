import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-card',
  imports: [HlmButtonImports, HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: "mx-auto w-full max-w-sm flex flex-col justify-between"
	},
  template: `
    <hlm-card size="sm" class="mx-auto w-full max-w-sm flex flex-col justify-between">
      <hlm-card-header>
        <h3 hlmCardTitle class="truncate">{{title()}}</h3>
        <p hlmCardDescription>{{description()}}</p>
      </hlm-card-header>
      <div hlmCardContent class="aspect-video w-full">
        <p> {{content()}} </p>
      </div>
      <hlm-card-footer>
        <ng-content select="[slot=footer]"></ng-content>
      </hlm-card-footer>
    </hlm-card>
  `,
  styles: '',
})
export class Card {
  title = input<string>("");
  description = input<string>("");
  content = input<string>("");
  loading = input<boolean>(false);

}
