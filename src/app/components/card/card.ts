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
        <h3 hlmCardTitle>Jonathan Rodel Golimlim</h3>
        <p hlmCardDescription>Metro Manila, PH</p>
      </hlm-card-header>
      <div hlmCardContent>
        <p>
          Full-stack developer that focuses on developing web applications through Angular and .NET.
        </p>
      </div>
      <hlm-card-footer>
        <p></p>
        @if(hasCta()){
          <button hlmBtn variant="outline" size="sm" class="w-full">Action</button>
        }
      </hlm-card-footer>
    </hlm-card>
  `,
  styles: '',
})
export class Card {
  hasCta = input<boolean>(false)
}
