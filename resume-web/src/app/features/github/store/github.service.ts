import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable, EMPTY } from "rxjs";
import { expand, map, reduce } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class GithubService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.githubToken}`,
    'Accept': 'application/vnd.github.v3+json'
  });
  private baseUrl = environment.githubURL;

  constructor(private api: HttpClient){}

  public get<T>(endpoint: string): Observable<T>{
    const url = `${this.baseUrl}/${endpoint}`;
    return this.api.get<T>(url, {headers: this.headers})
  }

  /**
   * Fetch all paginated pages for a given endpoint. Ensures `per_page=100` is applied.
   * Returns a concatenated array of results from all pages.
   */
  public getAllPages<T>(endpoint: string): Observable<T[]>{
    const sep = endpoint.includes('?') ? '&' : '?';
    const endpointWithPageSize = `${endpoint}${sep}per_page=100`;
    const firstUrl = `${this.baseUrl}/${endpointWithPageSize}`;

    return this.api.get<T[]>(firstUrl, { headers: this.headers, observe: 'response' as any }).pipe(
      expand((res: any) => {
        const link = res.headers?.get?.('link') || '';
        const m = link.match(/<([^>]+)>;\s*rel="next"/);
        if (m && m[1]) {
          return this.api.get<T[]>(m[1], { headers: this.headers, observe: 'response' as any });
        }
        return EMPTY;
      }),
      map((r: any) => r.body as T[]),
      reduce((acc: T[], body: T[] | undefined) => acc.concat(body || []), [] as T[])
    );
  }

}
