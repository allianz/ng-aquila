/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { workspaces } from '@angular-devkit/core';

export function isAngularApplicationProject(project: workspaces.ProjectDefinition): boolean {
  if (project.extensions.projectType !== 'application') {
    return false;
  }

  const builder = project.targets?.get('build')?.builder.toString();
  if (builder && (builder.includes('@angular-devkit/build-angular:browser')
  || builder.includes('@angular-builders/custom-webpack:browser'))) {
    return true;
  }
  return false;
}
