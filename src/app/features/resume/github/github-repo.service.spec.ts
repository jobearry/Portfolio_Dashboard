import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { site } from '../../../core/config/site.config';
import { GithubRepoSignalService } from './github-repo.service';

describe('GithubRepoSignalService', () => {
  let service: GithubRepoSignalService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(GithubRepoSignalService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads repositories from the dashboard GitHub endpoint without the count suffix', async () => {
    const repositories = [
      {
        id: 1,
        name: 'portfolio',
        fullName: `${site.github.username}/portfolio`,
        htmlUrl: 'https://github.com/jobearry/portfolio',
        description: '',
        language: 'TypeScript',
        topics: [],
      },
    ];

    const request = service.load();

    http
      .expectOne(
        (req) =>
          req.url.endsWith(`/v1/github/owner/${site.github.username}/repositories`) &&
          !req.url.endsWith('/count'),
      )
      .flush(repositories);
    await request;

    expect(service.getState()).toEqual({
      content: repositories,
      loading: false,
      error: null,
    });
  });
});
