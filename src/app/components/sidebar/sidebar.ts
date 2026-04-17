import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutDashboard } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { SidebarGroup } from '../../core/constants/sidebar-sections';
import { RouterLink, RouterModule } from "@angular/router";
@Component({
  selector: 'app-sidebar',
  imports: [HlmSidebarImports, HlmIcon, NgIcon, RouterModule],
  template: `
    <div hlmSidebarWrapper>
      <hlm-sidebar>
        <div hlmSidebarHeader>
          <ng-icon hlm name="lucideLayoutDashboard" size="lg"></ng-icon>
          <div class="flex flex-col items-start">
            <h1 class="font-bold text-sm">{{ title() }}</h1>
            <p class="text-[.65rem]">{{ subtitle() }}</p>
          </div>
        </div>
        <div hlmSidebarContent>
          @for (item of sidebarContent(); track $index) {
            <div hlmSidebarGroup>
              <div hlmSidebarGroupLabel>{{ item.groupLabel }}</div>
              <div hlmSidebarContent>
                @for (content of item.groupContent; track $index) {
                  <ul hlmSidebarMenu>
                    <li hlmSidebarMenuItem>
                      <a hlmSidebarMenuButton [routerLink]="['/' + content.url]">
                        <ng-icon hlm [name]="content.icon" />
                        <span>{{ content.title }}</span>
                      </a>
                    </li>
                  </ul>
                }
              </div>
            </div>
          }
        </div>
        <div hlmSidebarFooter></div>
      </hlm-sidebar>
      <ng-content />
    </div>
  `,
  providers: [provideIcons({ lucideLayoutDashboard })],
  styles: ``,
})
export class Sidebar {
  title = input<string>('');
  subtitle = input<string>('Jobearry');
  sidebarContent = input<SidebarGroup[]>([]);
}
