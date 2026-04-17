import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-card',
  imports: [HlmButtonImports, HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-card size="sm" class="mx-auto w-full max-w-sm">
      <hlm-card-header>
        <h3 hlmCardTitle>{{title()}}</h3>
        <p hlmCardDescription>{{description()}}</p>
      </hlm-card-header>
      <div hlmCardContent>
        <p> {{content()}} </p>
      </div>
      <hlm-card-footer>
        <pre></pre>
        @if(hasCta()){
          <button hlmBtn variant="outline" size="sm" class="w-full">{{ctaName()}}</button>
        }
      </hlm-card-footer>
    </hlm-card>
  `,
  styles: '',
})
export class Card {
  hasCta = input<boolean>(false);
  ctaName = input<string>("Action");
  title = input<string>("");
  description = input<string>("");
  content = input<string>("");


}
