/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** @docs-private */
export function createMissingDateImplError(provider: string) {
    return Error(
        `NxDatepicker: No provider found for ${provider}. You must import one of the following ` +
            `modules at your application root: NxNativeDateModule, NxMomentDateModule, NxIsoDateModule or provide a ` +
            `custom implementation.`,
    );
}
