import { inject, Injectable, signal } from "@angular/core";
import { PortfolioApi } from "../../../../../../api/portfolio-api";
import { JGExperience } from "../core/models/experience";
import { JGProject } from "../core/models/project";
import { createPortfolioState, PortfolioState } from "./portfolio.state";

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
    this._state.update((state) => ({
      ...state,
      content: response,
      loading: false,
      message: ''
    }))
  }
}
