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
    <hlm-card size="sm">
      <hlm-card-header>
        <h3 hlmH3>{{title()}}</h3>
        <p hlmCardDescription>{{description()}}</p>
      </hlm-card-header>
      <div hlmCardContent>
        <ng-content select="[slot=content]"></ng-content>
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
  loading = input<boolean>(false);

}
