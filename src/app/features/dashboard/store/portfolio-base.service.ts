import { inject, Injectable, signal } from "@angular/core";
import { createPortfolioState, PortfolioState } from "./portfolio.state";
import { ApiClient } from "../../../core/api/api-client";
import { Result } from "../models/result";

/**This is the general service for anything resume related
 * This will utilize the api from @src/api
*/
@Injectable({providedIn: 'root'})
export class PortfolioSignalService<T>{
  protected readonly _state = signal<PortfolioState<T>>(createPortfolioState<T>());
  protected readonly apiClient = inject(ApiClient);

  getState(){
    return this._state();
  }
  setLoading(){
    this._state.update((state) => ({...state, loading: true, content: [], message: ""}))
  }

  async getPortfolioResource(endpoint: string){
    const response = await this.apiClient.get<Result<T[]>>(endpoint);
    console.log("🚀 ~ PortfolioSignalService ~ getPortfolioResource ~ response:", response)
    this._state.update((state) => ({
      ...state,
      content: response.value? response.value: [],
      loading: response.isSuccess? false: true,
      message: response.error? response.error: ""
    }))
  }
}
