import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmH3, HlmH2 } from "@spartan-ng/helm/typography";
import { HlmIcon } from "@spartan-ng/helm/icon";
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-card',
  imports: [HlmButtonImports, HlmCardImports, HlmH3],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-card size="sm" class="w-full max-w-sm">
      <hlm-card-header>
        <h3 hlmH3 class="truncate">{{title()}}</h3>
        <p hlmCardDescription>{{description()}}</p>
      </hlm-card-header>
      <div hlmCardContent class="h-20 w-full">
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
