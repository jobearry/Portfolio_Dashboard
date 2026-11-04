/**
 * A public repository returned by the portfolio API.
 *
 * The backend owns the GitHub call and normalises the payload: `description`
 * and `language` are empty strings when GitHub returns `null`, and only public
 * repositories are included.
 */
export interface GithubRepo {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  language: string;
  topics: string[];
}
