import { Component, input } from "@angular/core";
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: "app-section-button",
  imports: [NgIcon],
  template: `
    <button
      class="cursor-pointer hover:ring-1 hover:ring-zinc-500/50 focus:ring-1 border border-muted flex px-3.5 py-1 rounded-md items-center justify-center
      gap-1 bg-muted/50 w-full">
      <div class="flex justify-center items-center">
        <ng-icon [name]="item()!['iconName']" size="17"></ng-icon>
      </div>
      <div class="flex justify-between items-center w-full gap-4">
        <p class="flex justify-between items-center w-full gap-2">
          <span class="text-sm">{{item()!["sectionName"]}}</span>
          @if(item()!['sectionName'] !== 'Profile'){
            <span class="w-4 h-4 bg-muted flex justify-center items-center rounded-full text-[10px] truncate">{{itemCount()}}</span>
          }
        </p>
      </div>
    </button>
  `,
  styles: ``,
})
export class SectionButton {
  item = input<Record<string,string>>();
  itemCount = input(0);
}
