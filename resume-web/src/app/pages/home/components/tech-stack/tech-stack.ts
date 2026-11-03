import { Component, input } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { Marquee } from "../../../../components/marquee/marquee";

@Component({
  selector: 'app-tech-stack',
  imports: [LucideAngularModule, Marquee],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.css',
})
export class TechStack {
  title = input<string>("")
}
