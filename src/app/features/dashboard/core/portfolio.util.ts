import { PortfolioSignalService } from "../store/portfolio-base.service";

export async function getContent<T>(endpoint:string, signalState: PortfolioSignalService<T>){
  signalState.setLoading();
  await(signalState.getPortfolioResource(endpoint));
}
