import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ResourceSignalService } from './resource-base.service';

interface Item {
  id: number;
}

describe('ResourceSignalService', () => {
  let service: ResourceSignalService<Item>;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ResourceSignalService<Item>);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('stores a single resource and clears the error on success', async () => {
    service.setLoading();
    const request = service.getResource('v1/items/1');

    http.expectOne((req) => req.url.endsWith('/v1/items/1')).flush({ id: 1 });
    await request;

    const state = service.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.content).toEqual({ id: 1 });
  });

  it('leaves loading and exposes a message when the request fails', async () => {
    service.setLoading();
    const request = service.getResource('v1/items/1');

    http
      .expectOne((req) => req.url.endsWith('/v1/items/1'))
      .flush('boom', { status: 500, statusText: 'Server Error' });
    await request;

    const state = service.getState();
    expect(state.loading).toBe(false);
    expect(state.content).toBeNull();
    expect(state.error).toContain('500');
  });

  it('reports an unreachable API distinctly from a server error', async () => {
    service.setLoading();
    const request = service.getResource('v1/items/1');

    http
      .expectOne((req) => req.url.endsWith('/v1/items/1'))
      .error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });
    await request;

    const state = service.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toContain('Could not reach the portfolio API');
  });
});
