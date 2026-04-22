import { inject, Injectable } from "@angular/core";
import { PortfolioApi } from "../../../../../../api/portfolio-api";
import { JGExperience } from "../core/models/experience";
import { JGProject } from "../core/models/project";

/**This is the general service for anything resume related
 * This will utilize the api from @src/api
*/
@Injectable({providedIn: 'root'})
export class PortfolioSignalService{
  protected readonly api = inject(PortfolioApi)

  async getExperience(){
    const endpoint = `v1/Experience`;
    return await this.api.get<JGExperience[]>(endpoint);
  }
  async getProject(){
    const endpoint = `v1/Project`;
    return await this.api.get<JGProject[]>(endpoint);
  }
}
