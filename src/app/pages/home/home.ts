import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { Card } from "../../components/card/card";

@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {

}
