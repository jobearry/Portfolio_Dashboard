import { inject, Injectable, signal } from '@angular/core';
import { ApiClient } from '../../core/api/api-client';
import { createResourceState, ResourceState } from '../store/resource.state';
import { getErrorMessage } from '../utils/error.util';

/**
 * Signal state for endpoints that return a single object instead of a list.
 * Mirrors `PortfolioSignalService<T>` with the same loading/error contract.
 */
@Injectable({ providedIn: 'root' })
export class ResourceSignalService<T> {
  protected readonly _state = signal<ResourceState<T>>(createResourceState<T>());
  protected readonly apiClient = inject(ApiClient);

  getState() {
    return this._state();
  }

  setLoading() {
    this._state.update((state) => ({ ...state, loading: true, error: null }));
  }

  async getResource(endpoint: string) {
    try {
      const response = await this.apiClient.get<T>(endpoint);

      this._state.set({
        content: response ?? null,
        loading: false,
        error: null,
      });
    } catch (error) {
      this._state.set({
        content: null,
        loading: false,
        error: getErrorMessage(error),
      });
    }
  }
}
