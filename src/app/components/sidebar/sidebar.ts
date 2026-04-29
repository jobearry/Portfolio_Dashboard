import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutDashboard, lucideUserCircle } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { RouterModule } from "@angular/router";
import { SidebarGroupMenu } from '../../core/constants/sidebar-sections';
@Component({
  selector: 'app-sidebar',
  imports: [HlmSidebarImports, HlmIcon, NgIcon, RouterModule],
  template: `
    <div hlmSidebarWrapper>
      <hlm-sidebar>
        <div hlmSidebarHeader class="p-2">
          <ng-icon hlm name="lucideUserCircle" size="lg"></ng-icon>
          <div class="flex flex-col items-start">
            <h1 class="font-bold text-sm">{{ title() }}</h1>
            <p class="text-[.65rem]">{{ subtitle() }}</p>
          </div>
        </div>
        <div hlmSidebarContent class="p-2">
          @for (item of sidebarContent(); track $index) {
            <ul hlmSidebarMenu>
              <li hlmSidebarMenuItem>
                <a hlmSidebarMenuButton [routerLink]="[item.url]">
                  <ng-icon hlm [name]="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </li>
            </ul>
          }
        </div>
        <div hlmSidebarFooter></div>
      </hlm-sidebar>

      <ng-content />
    </div>
  `,
  providers: [provideIcons({ lucideUserCircle })],
  styles: ``,
})
export class Sidebar {
  title = input<string>('');
  subtitle = input<string>('Jobearry');
  sidebarContent = input<SidebarGroupMenu[]>([]);
}
