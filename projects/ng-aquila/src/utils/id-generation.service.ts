import { APP_ID, inject, Injectable } from '@angular/core';

/**
 * Service to generate unique IDs using the Angular APP_ID as a namespace.
 * If the APP_ID is the default 'ng', a random string is used instead.
 * This helps prevent ID collisions in micro frontend scenarios.
 */
@Injectable({ providedIn: 'root' })
export class IdGenerationService {
  private static _counter = 0;
  private readonly _appId: string;

  constructor() {
    const appId = inject(APP_ID, { optional: true });
    // If APP_ID is not provided or is the default 'ng', generate a random one
    if (!appId || appId === 'ng') {
      this._appId = 'ng-' + Math.random().toString(36).slice(2, 10);
    } else {
      this._appId = appId;
    }
  }

  /**
   * Generates a unique ID with the given prefix.
   * @param prefix The prefix for the ID (e.g., component name)
   * @returns A unique ID string
   */
  nextId(prefix: string): string {
    return `${this._appId}-${prefix}-${IdGenerationService._counter++}`;
  }
}
