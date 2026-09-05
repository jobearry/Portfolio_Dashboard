export interface PortfolioState<T>{
  content: T[]
  loading: boolean
  message: string
}

export function createPortfolioState<T>(): PortfolioState<T>{
  return {
    content: [],
    loading: false,
    message: ''
  }
}
