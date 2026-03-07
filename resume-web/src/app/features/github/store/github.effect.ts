import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { GithubAPIActions } from "./github.action";
import { catchError, concatMap, map, of, switchMap, take, from, mergeMap, toArray } from "rxjs";
import { GithubService } from "./github.service";
import { GithubRepo } from "../types/github.type";
import { State } from "../../../shared/store.provider";

@Injectable()
export class ProjectEffects{
  private actions$ = inject(Actions);
  constructor(
    private githubService: GithubService,
    private store: Store<State>
  ){}

  _getGithubRepos = createEffect(() =>
    this.actions$.pipe(
      ofType(GithubAPIActions.viewGithubProjects),
      switchMap((actions) => {
        return this.githubService.get<GithubRepo[]>("user/repos").pipe(
          map(repos => {
            const publicRepos = repos.filter(x => x.private !== true)
            return GithubAPIActions.viewGithubProjectsSuccess({repos: publicRepos})
          }),
          catchError(err => {
            return of(GithubAPIActions.viewGithubProjectsFail())
          })
        )
      })
    )
  )

  _getMonthlyCommits = createEffect(() =>
    this.actions$.pipe(
      ofType(GithubAPIActions.viewGithubCommits),
      concatMap((actions) => {
        return this.store.select(state => state.project).pipe(
          take(1),
          switchMap((project) => {

            const aggregateCommitsFor = (reposList: GithubRepo[] | any[]) => {
              return from(reposList).pipe(
                mergeMap((r: any) => {
                  const full = r.full_name || `${r.owner?.login}/${r.name}`;
                  const endpoint = `repos/${full}/commits?since=${encodeURIComponent(actions.startDate)}&until=${encodeURIComponent(actions.endDate)}`;
                  return this.githubService.getAllPages<any>(endpoint).pipe(
                    map(commits => commits.map(c => ({ ...c, _repo: full })))
                  );
                }, 4), // concurrency 4
                toArray(),
                map((arrOfArrays) => arrOfArrays.flat()),
                map((commits) => GithubAPIActions.viewGithubCommitsSuccess({ commits } as any))
              );
            };

            // If no repos in state, fetch the user's repos first, then aggregate commits
            if (!project.githubRepos || !project.githubRepos.length) {
              return this.githubService.get<GithubRepo[]>("user/repos").pipe(
                switchMap((repos) => {
                  // Optionally you could dispatch viewGithubProjectsSuccess here, but we proceed directly
                  return aggregateCommitsFor(repos);
                }),
                catchError(() => of(GithubAPIActions.viewGithubCommitsFail()))
              );
            }

            // Otherwise use repos from state
            return aggregateCommitsFor(project.githubRepos).pipe(
              catchError(() => of(GithubAPIActions.viewGithubCommitsFail()))
            );

          })
        )
      })
    )
  )
}

