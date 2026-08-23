import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUserCircle } from '@ng-icons/lucide';
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
        <div hlmSidebarHeader class="m-2 items-center border rounded-md">
          <a [routerLink]="['/profile']" title="View Profile" class="grid gap-2">
            <img class="h-15 w-15 p-1 rounded-full" src="grad_1.jpeg" alt="person-holding-diploma" />
            <div class="flex flex-col items-start">
              <h1 class="font-bold text-xl">{{ title() }}</h1>
              <p class="text-sm text-zinc-400/50">{{ subtitle() }}</p>
            </div>
          </a>
        </div>
        <div hlmSidebarContent class="p-2">
          @for (item of sidebarContent(); track $index) {
            <ul hlmSidebarMenu>
              <li hlmSidebarMenuItem>
                <a hlmSidebarMenuButton [routerLink]="[item.url]"
                  (click)="onItemClick.emit(item)">
                  <ng-icon hlm [name]="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </li>
            </ul>
          }
        </div>
        <div hlmSidebarFooter>
        </div>
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
  onItemClick = output<SidebarGroupMenu>();
}
