import { Component } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-maintenance',
  imports: [LucideAngularModule],
  template: `
    <div class="w-full grid place-items-center p-5 my-2">
      <lucide-icon name="construction" size="50"></lucide-icon>
      <h1>...working on it...</h1>
    </div>
  `,
  styles: ``,
})
export class Maintenance {

}
