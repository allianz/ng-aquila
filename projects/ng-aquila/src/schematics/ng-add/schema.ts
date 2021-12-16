/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export interface Schema {
    /** Name of the project. */
    project: string;

    /** Type of the project */
    type: 'b2b' | 'b2c';

    /** Whether no theme should be added. */
    noTheme: boolean;

    /** Whether the Starter App should be added. */
    starter: boolean;
}
