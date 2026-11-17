// source=projects/ng-aquila/src/icon/icon.component.ts
// component=NxIconComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const { name, figmaName } = figma.batch;

export default {
  example: name
    ? figma.html`<nx-icon name="${name}" aria-hidden="true"></nx-icon>`
    : figma.html`<!-- The icon "${figmaName}" is not available in code yet -->`,
  imports: name ? ["import { NxIconComponent } from '@allianz/ng-aquila/icon';"] : [],
  id: 'nx-icon',
  metadata: { nestable: true, props: { name } },
};
