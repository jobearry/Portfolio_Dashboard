import { Component, OnInit } from '@angular/core';
import { Highlights } from "./components/highlights";
import { LucideAngularModule } from "lucide-angular";
import { BlockComponent } from "../home/components/block-container/block-container";
import { Router } from '@angular/router';
import { GithubService } from './services/github.service';
import { Observable } from 'rxjs';
import { ProjectState } from './store/project.state';
import { Store } from '@ngrx/store';
import { State } from '../../shared/store.provider';
import { ProjectActions } from './store/project.action';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/card';

@Component({
  selector: 'app-projects',
  imports: [
    Highlights, LucideAngularModule, BlockComponent, CommonModule,
    Card
  ],
  templateUrl: './projects.html',
  styles: ``,
})
export class Projects implements OnInit {
  projectState$!: Observable<ProjectState>
  constructor(
    private router: Router,
    private store: Store<State>
  ){
    this.projectState$ = store.select(state => state.project)
  }

  ngOnInit(): void {
   this.store.dispatch(ProjectActions.viewGithubProjects());
  }

  goHome(){
    this.router.navigate(['home'])
  }
}
