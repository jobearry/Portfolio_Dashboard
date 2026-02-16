import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectActions } from "./project.action";
import { catchError, map, of, switchMap } from "rxjs";
import { GithubService } from "../services/github.service";
import { GithubRepo } from "../types/github.type";

@Injectable()
export class ProjectEffects{
  private actions$ = inject(Actions);
  constructor(
    private githubService: GithubService
  ){}

  _getGithubRepos = createEffect(() => 
    this.actions$.pipe(
      ofType(ProjectActions.viewGithubProjects),
      switchMap((actions) => {
        return this.githubService.get<GithubRepo[]>("users/jobearry/repos").pipe(
          map(repos => {
            console.log("🚀 ~ ProjectEffects ~ repos:", repos)
            return ProjectActions.viewGithubProjectsSuccess({repos})
          }),
          catchError(err => {
            return of(ProjectActions.viewGithubProjectsFail())
          })
        )
      })
    )
  )
}