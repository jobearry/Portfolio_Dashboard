import { Component, inject } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { JGProject } from '../../core/models/project';
import { JGExperience } from '../../core/models/experience';

@Component({
  selector: 'app-project-dialog',
  imports: [HlmDialogImports, HlmInputImports, HlmButtonImports],
  template: `
    <hlm-dialog>
      <hlm-dialog-header>
        <div class="p-2">
          <h3 hlmDialogTitle class="text-start">{{_experience.companyName}}</h3>
          <p hlmDialogDescription class="text-start">{{_experience.description}}</p>
          <p class="flex flex-col text-start text-xs font-bold pt-2">
            <span>Responsibility: </span>
            <span hlmDialogDescription class="text-xs">{{_experience.responsibility}}</span>
          </p>
        </div>
        <div class="flex flex-wrap gap-2 max-h-56 overflow-y-auto
        [scrollbar-width:thin] [scrollbar-color:#888_transparent]">
          @for (item of _projects; track item.projectId) {
            <div class="flex flex-col gap-2 rounded-sm p-3 bg-zinc-900/50 text-start">
              <h4 class="font-semibold">{{item.projectName}}</h4>
              <p class="text-muted-foreground">{{item.description}}</p>

              <p class="text-muted-foreground font-bold">Built with:</p>
              <div class="flex flex-wrap gap-1">
                @for (specs of item.techStackSpecs; track specs.specId) {
                  <img class="rounded-sm hover:ring-1 focus:ring-1 ring-primary transition-all"
                    [src]="getShieldsIOUrl(specs.toolName)" [alt]="specs.toolName">
                }
              </div>
            </div>
          }
        </div>
      </hlm-dialog-header>
    </hlm-dialog>
  `,
  styles: ``,
})
export class ProjectDialog {
  private readonly _dialogRef = inject<BrnDialogRef<JGProject>>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{projects: JGProject[], experience: JGExperience}>();

  protected readonly _projects = this._dialogContext.projects;
  protected readonly _experience = this._dialogContext.experience;

  getShieldsIOUrl(techStackName: string){
    return `https://img.shields.io/badge/${techStackName}-3b4664?style=for-the-badge&logo=${techStackName}&logoColor=white`
  }
}
