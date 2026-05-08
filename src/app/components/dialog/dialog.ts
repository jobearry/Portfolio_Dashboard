import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-dialog',
  imports: [HlmDialogImports, HlmInputImports, HlmButtonImports],
  template: `
    <hlm-dialog>
			<hlm-dialog-content class="sm:max-w-106.25" *hlmDialogPortal="let ctx">
				<hlm-dialog-header>
					<h3 hlmDialogTitle>Edit profile</h3>
					<p hlmDialogDescription>Make changes to your profile here. Click save when you're done.</p>
				</hlm-dialog-header>
				<div class="grid gap-4">
					<div class="grid gap-3">
            <p>TEST</p>
					</div>
					<div class="grid gap-3">
            <p>TEST</p>
					</div>
				</div>
				<hlm-dialog-footer>
					<button hlmBtn variant="outline" hlmDialogClose>Cancel</button>
					<button hlmBtn type="submit">Save changes</button>
				</hlm-dialog-footer>
			</hlm-dialog-content>
		</hlm-dialog>
  `,
  styles: ``,
})
export class Dialog {

}
