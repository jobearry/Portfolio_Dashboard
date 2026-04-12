import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBlocks, lucideLayoutDashboard } from '@ng-icons/lucide';
import { HlmSidebar, HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmIcon } from "@spartan-ng/helm/icon";
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [HlmSidebarImports, HlmIcon, NgIcon],
  providers: [provideIcons({lucideLayoutDashboard})],
  template: `
    <div hlmSidebarWrapper>
      <hlm-sidebar>
        <div hlmSidebarHeader>
          <ng-icon hlm name="lucideLayoutDashboard" size="lg"></ng-icon>
          <div class="flex flex-col items-start">
            <h1 class="font-bold text-sm">{{title()}}</h1>
            <p class="text-[.65rem]">{{subtitle()}}</p>
          </div>
        </div>
        <div hlmSidebarContent>
          @for (item of sidebarContent(); track $index) {
            <div hlmSidebarGroup></div>
          }
        </div>
        <div hlmSidebarFooter></div>
      </hlm-sidebar>
      <ng-content />
    </div>
  `,
  styles: ``,
})
export class Sidebar {
  title = input<string>("");
  subtitle = input<string>("Jobearry")
  sidebarContent = input<{title: string}[]>([])
}
