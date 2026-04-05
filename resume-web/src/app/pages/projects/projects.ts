import { Component, OnInit } from '@angular/core';
import { Highlights } from "./components/highlights";
import { LucideAngularModule } from "lucide-angular";
import { BlockComponent } from "../home/components/block-container/block-container";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../shared/store.provider';
import { CommonModule } from '@angular/common';
import { PROJECT_HIGHLIGHT } from './constants/project.constant';
import { Project } from './types/project.type';
import { GithubProjectState } from '../../features/github/store/github.state';
import { GithubAPIActions } from '../../features/github/store/github.action';
import { Github } from "../../features/github/ui/github";
import { Pill } from "../../components/pill";

@Component({
  selector: 'app-projects',
  imports: [
    Highlights, LucideAngularModule, BlockComponent, CommonModule,
    Github,
    Pill
],
  templateUrl: './projects.html',
  styles: ``,
})
export class Projects implements OnInit {
  corpoProjects: Project[] = PROJECT_HIGHLIGHT
  projectState$!: Observable<GithubProjectState>
  constructor(
    private router: Router,
    private store: Store<State>
  ){
    this.projectState$ = store.select(state => state.project)

    try {
      const saved = localStorage.getItem('theme');

      // apply initial theme attribute and class on `html` (primary source-of-truth)
      const html = document.documentElement;
      if (html) {
        if (saved === 'dark') {
          html.classList.add('dark');
          html.setAttribute('data-theme', 'dark');
        } else {
          html.classList.remove('dark');
          html.setAttribute('data-theme', 'light');
        }
      }
    } catch (e) {
      // ignore
    }
  }

  ngOnInit(): void {
   this.store.dispatch(GithubAPIActions.viewGithubProjects());
  }

  goHome(){
    this.router.navigate(['home'])
  }
}
