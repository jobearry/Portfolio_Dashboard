import { Component, input } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmIcon } from "@spartan-ng/helm/icon";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideExternalLink } from '@ng-icons/lucide';
import { TRANSITION_MOVE_UP } from '../../core/styles/transitions';

@Component({
  selector: 'app-item',
  imports: [HlmItemImports, HlmButtonImports, HlmIcon, NgIcon],
  templateUrl: './item.html',	providers: [
		provideIcons({
			lucideExternalLink,
		}),
	],
  styles: ``,
})
export class BlogItem {
  title = input<string>("");
  description = input<string>("");
  icon = input<string>('lucideExternalLink');

}
