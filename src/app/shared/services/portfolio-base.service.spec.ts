import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PortfolioSignalService } from './portfolio-base.service';

interface Item {
  id: number;
}

describe('PortfolioSignalService', () => {
  let service: PortfolioSignalService<Item>;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PortfolioSignalService<Item>);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('stores content and clears the error on success', async () => {
    service.setLoading();
    const request = service.getPortfolioResource('v1/items');

    http.expectOne((req) => req.url.endsWith('/v1/items')).flush([{ id: 1 }]);
    await request;

    const state = service.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.content).toEqual([{ id: 1 }]);
  });

  it('leaves loading and exposes a message when the request fails', async () => {
    service.setLoading();
    const request = service.getPortfolioResource('v1/items');

    http
      .expectOne((req) => req.url.endsWith('/v1/items'))
      .flush('boom', { status: 500, statusText: 'Server Error' });
    await request;

    const state = service.getState();
    expect(state.loading).toBe(false);
    expect(state.content).toEqual([]);
    expect(state.error).toContain('500');
  });

  it('reports an unreachable API distinctly from a server error', async () => {
    service.setLoading();
    const request = service.getPortfolioResource('v1/items');

    http
      .expectOne((req) => req.url.endsWith('/v1/items'))
      .error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });
    await request;

    const state = service.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toContain('Could not reach the portfolio API');
  });
});
