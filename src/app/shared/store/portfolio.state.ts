export interface PortfolioState<T> {
  content: T[];
  loading: boolean;
  error: string | null;
}

export function createPortfolioState<T>(): PortfolioState<T> {
  return {
    content: [],
    loading: false,
    error: null,
  };
}
