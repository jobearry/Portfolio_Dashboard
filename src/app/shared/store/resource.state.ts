export interface ResourceState<T> {
  content: T | null;
  loading: boolean;
  error: string | null;
}

export function createResourceState<T>(): ResourceState<T> {
  return {
    content: null,
    loading: false,
    error: null,
  };
}
