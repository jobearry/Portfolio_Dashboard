import { Component } from '@angular/core';
import { Highlights } from "./components/highlights";
import { PROJECT_HIGHLIGHT } from './constants/project.constant';
import { LucideAngularModule } from "lucide-angular";
import { BlockComponent } from "../home/components/block-container/block-container";
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [Highlights, LucideAngularModule, BlockComponent],
  templateUrl: './projects.html',
  styles: ``,
})
export class Projects {
  recents = PROJECT_HIGHLIGHT
  constructor(private router: Router){}
  goHome(){
    this.router.navigate(['home'])
  }
}
