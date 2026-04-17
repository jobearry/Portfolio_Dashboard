import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { Card } from "../../components/card/card";
import { Profile } from './components/profile/profile';

@Component({
  selector: 'app-home',
  imports: [Profile],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {
}
