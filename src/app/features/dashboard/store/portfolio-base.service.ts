import { inject, Injectable, signal } from "@angular/core";
import { createPortfolioState, PortfolioState } from "./portfolio.state";
import { PortfolioApi } from "../../../data/api/portfolio-api";

/**This is the general service for anything resume related
 * This will utilize the api from @src/api
*/
@Injectable({providedIn: 'root'})
export class PortfolioSignalService<T>{
  protected readonly _state = signal<PortfolioState<T>>(createPortfolioState<T>());
  protected readonly api = inject(PortfolioApi)

  getState(){
    return this._state();
  }
  setLoading(){
    this._state.update((state) => ({...state, loading: true, content: [], message: ""}))
  }

  async getPortfolioResource(endpoint: string){
    const response = await this.api.get<T[]>(endpoint);
    console.log("🚀 ~ PortfolioSignalService ~ getPortfolioResource ~ response:", response)
    this._state.update((state) => ({
      ...state,
      content: response,
      loading: false,
      message: ''
    }))
  }
}
