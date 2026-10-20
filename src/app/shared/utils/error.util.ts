import { HttpErrorResponse } from '@angular/common/http';

const FALLBACK_MESSAGE = 'Something went wrong while loading this section.';

/**
 * Turns an unknown request failure into a message that is safe to render.
 * Never leaks response bodies or stack traces into the UI.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'Could not reach the portfolio API. Check your connection and try again.';
    }

    return `The portfolio API returned an error (${error.status}). Please try again.`;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return FALLBACK_MESSAGE;
}
