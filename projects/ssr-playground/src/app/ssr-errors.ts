import { DOCUMENT, ErrorHandler, inject, Injectable, Provider } from '@angular/core';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';

@Injectable()
class SsrErrorCollector extends ErrorHandler {
  readonly errors: string[] = [];

  override handleError(error: unknown): void {
    this.errors.push(error instanceof Error ? (error.stack ?? error.message) : String(error));
    super.handleError(error);
  }
}

function writeErrorsIntoDocument(): () => void {
  const document = inject(DOCUMENT);
  const collector = inject(SsrErrorCollector);
  return () => {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.id = 'ssr-errors';
    // `<` is escaped so an error message containing `</script>` cannot end the element early.
    script.textContent = JSON.stringify(collector.errors).replace(/</g, '\\u003c');
    document.body.appendChild(script);
  };
}

/**
 * Collects every error Angular hands to its `ErrorHandler` during one server render and writes them
 * into the HTML response. Errors thrown from a timer after the render is serialized never reach it.
 */
export const provideSsrErrorReporting = (): Provider[] => [
  SsrErrorCollector,
  { provide: ErrorHandler, useExisting: SsrErrorCollector },
  { provide: BEFORE_APP_SERIALIZED, useFactory: writeErrorsIntoDocument, multi: true },
];
