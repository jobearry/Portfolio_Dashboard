import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PortfolioApi {
  private readonly baseUrl = `${environment.portfolioApi}`;
  //for improvement
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private readonly portfolioApi = inject(HttpClient);

  async get<T>(endpoint: string) {
    const url = `${this.baseUrl}/${endpoint}`;
    return await firstValueFrom(this.portfolioApi.get<T>(url, { headers: this.headers }));
  }
}
