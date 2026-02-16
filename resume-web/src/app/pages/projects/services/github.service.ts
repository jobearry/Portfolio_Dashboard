import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { map, Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class GithubService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.githubToken}`,
    'Accept': 'application/vnd.github.v3+json'
  });
  private baseUrl = "https://api.github.com";

  constructor(private api: HttpClient){}

  public get<T>(endpoint: string): Observable<T>{
    const url = `${this.baseUrl}/${endpoint}`;
    return this.api.get<T>(url, {headers: this.headers})
  }
}