import { inject, Injectable, signal } from '@angular/core';
import { createPortfolioState, PortfolioState } from '../store/portfolio.state';
import { getErrorMessage } from '../utils/error.util';
import { ApiClient } from '../../core/api/api-client';

/**This is the general service for anything resume related
 * This will utilize the api from @src/api
 */
@Injectable({ providedIn: 'root' })
export class PortfolioSignalService<T> {
  protected readonly _state = signal<PortfolioState<T>>(createPortfolioState<T>());
  protected readonly apiClient = inject(ApiClient);

  getState() {
    return this._state();
  }

  setLoading() {
    this._state.update((state) => ({ ...state, loading: true, error: null }));
  }

  async getPortfolioResource(endpoint: string) {
    try {
      const response = await this.apiClient.get<T[]>(endpoint);

      this._state.set({
        content: response ?? [],
        loading: false,
        error: null,
      });
    } catch (error) {
      this._state.set({
        content: [],
        loading: false,
        error: getErrorMessage(error),
      });
    }
  }
}
