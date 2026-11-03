import { ResourceSignalService } from '../services/resource-base.service';

export async function getResource<T>(endpoint: string, signalState: ResourceSignalService<T>) {
  signalState.setLoading();
  await signalState.getResource(endpoint);
}
