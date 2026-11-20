// url=<A1_FILE>?node-id=5-3552
// source=projects/ng-aquila/src/input/input.directive.ts
// component=NxInputDirective
/// <reference types="@figma/code-connect/figma-types-no-require" />
import type { InstanceHandle } from 'figma';
import figma from 'figma';

const instance = figma.selectedInstance;

// `findInstance` misses parts inside container frames (Hint, Plain Message), `findLayers` does not.
function findPart(root: InstanceHandle, name: string, traverseInstances = false) {
  const [found] = root.findLayers((node) => node.type === 'INSTANCE' && node.name === name, {
    traverseInstances,
  });
  return found?.type === 'INSTANCE' ? (found as InstanceHandle) : undefined;
}
function escape(text: string) {
  return text.replace(/"/g, '&quot;');
}
// In element text, `{`, `}` and `@` start interpolation or block syntax in an Angular template, `<` `>` tags.
function escapeText(text: string) {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/@/g, '&#64;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

const state = instance.getEnum('State', {
  Resting: undefined,
  'Resting Signal': 'signal',
  Focus: undefined,
  'Focus Signal': 'signal',
  Disabled: 'disabled',
  'Read-Only': 'readonly',
});

// `nx-formfield` has its own label inputs, so the Label instance is read here instead of
// rendering its `nx-label` template.
const showLabel = instance.getBoolean('Label');
const showHint = instance.getBoolean('Hint');
const showMessage = state === 'signal' && instance.getBoolean('Message');
const labelPart = showLabel ? findPart(instance, 'Label') : undefined;
const hintPart = showHint ? findPart(instance, 'Hint') : undefined;
const messagePart = showMessage ? findPart(instance, 'Plain Message') : undefined;

const label = labelPart?.getString('Text').trim();
const optional = labelPart?.getBoolean('Optional')
  ? labelPart
      .getString('↪️ Optional')
      .trim()
      .replace(/^\((.*)\)$/, '$1')
  : undefined;
const hasInfo = labelPart?.getBoolean('Info Button') ?? false;
const hint = hintPart?.getString('Text').trim();
const messageText = messagePart?.findText('Message');
const message = messageText?.type === 'TEXT' ? messageText.textContent.trim() : undefined;
// Plain Message has no type of its own; its icon's Signal Type follows the Signal Type variable mode.
const signalIcon = messagePart
  ? findPart(messagePart, 'Functional Signal Filled Icon Presets ⚛️', true)
  : undefined;
const status = signalIcon?.getEnum('Signal Type', {
  Critical: undefined,
  Positive: 'positive',
  Warning: 'warning',
  Info: 'info',
});

const value = instance.getBoolean('Filled') ? instance.getString('Filled Text').trim() : '';
const placeholder =
  !value && instance.getBoolean('Placeholder')
    ? instance.getString('Placeholder Text').trim()
    : undefined;

const missingParts = [
  ['Label', showLabel, labelPart],
  ['Hint', showHint, hintPart],
  ['Plain Message', showMessage, messagePart],
]
  .filter(([, shown, part]) => shown && !part)
  .map(([name]) => name);
const missingNote = missingParts.length
  ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
  : '';

const formfieldAttributes = `${label !== undefined ? ` label="${escape(label)}"` : ''}${
  optional ? ` optionalLabel="${escape(optional)}"` : ''
}${status ? ` status="${status}"` : ''}`;
const textareaAttributes = `${value ? ` value="${escape(value)}"` : ''}${
  placeholder ? ` placeholder="${escape(placeholder)}"` : ''
}${
  state === 'disabled' || state === 'readonly' ? ` ${state}` : ''
}${label !== undefined ? '' : ' nxAriaLabel="…"'}`;

const info = hasInfo ? `\n  <nx-info-icon nxLabelInfo><!-- help text --></nx-info-icon>` : '';
const hintLine = showHint
  ? `\n  <span nxFormfieldHint>${hint ? escapeText(hint) : '…'}</span>`
  : '';
const messageContent = message ? escapeText(message) : '…';
const messageLine = !showMessage
  ? ''
  : status
    ? `\n  <span nxFormfieldStatusMessage>${messageContent}</span>`
    : `\n  <nx-error nxFormfieldError>${messageContent}</nx-error>`;
const showError = showMessage && !status;

const formfieldImports = [
  'NxFormfieldComponent',
  ...(hintLine ? ['NxFormfieldHintDirective'] : []),
  ...(showError ? ['NxFormfieldErrorDirective'] : []),
];
const baseImports = [
  ...(hasInfo ? ['NxLabelInfoDirective'] : []),
  ...(showError ? ['NxErrorComponent'] : []),
];

export default {
  example: figma.html`${missingNote}<nx-formfield${formfieldAttributes}>
  <textarea nxInput${textareaAttributes}></textarea>${info}${hintLine}${messageLine}
</nx-formfield>`,
  imports: [
    `import { ${formfieldImports.join(', ')} } from '@allianz/ng-aquila/formfield';`,
    "import { NxInputDirective } from '@allianz/ng-aquila/input';",
    ...(baseImports.length
      ? [`import { ${baseImports.join(', ')} } from '@allianz/ng-aquila/base';`]
      : []),
    ...(hasInfo ? ["import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';"] : []),
  ],
  id: 'nx-textarea',
  metadata: { nestable: true },
};
