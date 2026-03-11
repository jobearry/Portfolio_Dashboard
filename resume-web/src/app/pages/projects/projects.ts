import { Component, OnInit } from '@angular/core';
import { Highlights } from "./components/highlights";
import { LucideAngularModule } from "lucide-angular";
import { BlockComponent } from "../home/components/block-container/block-container";
import { Router } from '@angular/router';
import { GithubService } from '../../features/github/store/github.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../shared/store.provider';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/card';
import { PROJECT_HIGHLIGHT } from './constants/project.constant';
import { Project } from './types/project.type';
import { GithubProjectState } from '../../features/github/store/github.state';
import { GithubAPIActions } from '../../features/github/store/github.action';
import { Github } from "../../features/github/ui/github";

@Component({
  selector: 'app-projects',
  imports: [
    Highlights, LucideAngularModule, BlockComponent, CommonModule,
    Github,
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
  }

  ngOnInit(): void {
   this.store.dispatch(GithubAPIActions.viewGithubProjects());
  }

  goHome(){
    this.router.navigate(['home'])
  }
}
