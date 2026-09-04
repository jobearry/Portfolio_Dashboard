type Section = 'pjCount' | 'expCount' | 'techCount';
export interface PortfolioItems extends Record<Section, number> {}
