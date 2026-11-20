// url=<A1_FILE>?node-id=5-3458
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
// In element text, `<` opens a tag, `{` `}` start interpolation and `@` starts block syntax.
const textEntities: { [key: string]: string } = {
  '<': '&lt;',
  '>': '&gt;',
  '{': '&#123;',
  '}': '&#125;',
  '@': '&#64;',
};
function escapeText(text: string) {
  return text.replace(/[<>@{}]/g, (char) => textEntities[char]);
}
// Icons are read by name from their own template, like the plain button does.
function iconName(part: InstanceHandle | undefined, swapProperty: string) {
  const swap = part?.getInstanceSwap(swapProperty);
  const name = swap?.type === 'INSTANCE' ? swap.executeTemplate().metadata?.props?.name : undefined;
  return typeof name === 'string' ? name : '…';
}

const state = instance.getEnum('State', {
  Resting: undefined,
  'Resting Signal': 'signal',
  Focus: undefined,
  'Focus Signal': 'signal',
  Disabled: 'disabled',
  'Read-Only': 'readonly',
});
// Size M is the default.
const size = instance.getEnum('Size', { S: 's', M: undefined });

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

const showPrefixIcon = instance.getBoolean('Prefix Icon');
const showCountryCode = instance.getBoolean('Prefix Country Code');
const showPrefixUnit = instance.getBoolean('Prefix Unit');
const showPostfixUnit = instance.getBoolean('Postfix Unit');
const showPostfixButton = instance.getBoolean('Postfix Button');
const showAppendix = instance.getBoolean('Appendix');
const showMenu = instance.getBoolean('Menu');
const prefixIconPart = showPrefixIcon ? findPart(instance, 'Prefix Icon') : undefined;
const postfixButtonPart = showPostfixButton ? findPart(instance, 'Postfix Button') : undefined;

const missingParts = [
  ['Label', showLabel, labelPart],
  ['Hint', showHint, hintPart],
  ['Plain Message', showMessage, messagePart],
  ['Prefix Icon', showPrefixIcon, prefixIconPart],
  ['Postfix Button', showPostfixButton, postfixButtonPart],
]
  .filter(([, shown, part]) => shown && !part)
  .map(([name]) => name);
const notes = [
  ...(missingParts.length
    ? [`Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete.`]
    : []),
  ...(showCountryCode ? ['For the country code prefix, use nx-phone-input instead'] : []),
  ...(showMenu ? ['For the menu, connect an nx-autocomplete with [nxAutocomplete]'] : []),
]
  .map((note) => `<!-- ${note} -->\n`)
  .join('');

const formfieldAttributes = `${label !== undefined ? ` label="${escape(label)}"` : ''}${
  optional ? ` optionalLabel="${escape(optional)}"` : ''
}${size ? ` size="${size}"` : ''}${status ? ` status="${status}"` : ''}`;
const inputAttributes = `${value ? ` value="${escape(value)}"` : ''}${
  placeholder ? ` placeholder="${escape(placeholder)}"` : ''
}${state === 'disabled' || state === 'readonly' ? ` ${state}` : ''}${
  showLabel ? '' : ' nxAriaLabel="…"'
}`;

const prefix = `${
  showPrefixIcon
    ? `\n  <nx-icon nxFormfieldPrefix name="${iconName(prefixIconPart, 'Icon Name')}" aria-hidden="true"></nx-icon>`
    : ''
}${showPrefixUnit ? `\n  <span nxFormfieldPrefix>${escapeText(instance.getString('Prefix Unit Text'))}</span>` : ''}`;
const suffix = `${
  showPostfixUnit
    ? `\n  <span nxFormfieldSuffix>${escapeText(instance.getString('Postfix Unit Text'))}</span>`
    : ''
}${
  showPostfixButton
    ? `\n  <button nxPlainButton nxFormfieldSuffix type="button" aria-label="…">\n    <nx-icon name="${iconName(postfixButtonPart, 'Icon Name')}" aria-hidden="true"></nx-icon>\n  </button>`
    : ''
}`;
const info = hasInfo ? `\n  <nx-info-icon nxLabelInfo><!-- info text --></nx-info-icon>` : '';
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
const appendix = showAppendix
  ? figma.html`
  <span nxFormfieldAppendix>${instance.getSlot('Appendix Slot')}</span>`
  : '';

const formfieldImports = [
  'NxFormfieldComponent',
  ...(prefix ? ['NxFormfieldPrefixDirective'] : []),
  ...(suffix ? ['NxFormfieldSuffixDirective'] : []),
  ...(hintLine ? ['NxFormfieldHintDirective'] : []),
  ...(showError ? ['NxFormfieldErrorDirective'] : []),
  ...(showAppendix ? ['NxFormfieldAppendixDirective'] : []),
];
const baseImports = [
  ...(hasInfo ? ['NxLabelInfoDirective'] : []),
  ...(showError ? ['NxErrorComponent'] : []),
];

export default {
  example: figma.html`${notes}<nx-formfield${formfieldAttributes}>${prefix}
  <input nxInput${inputAttributes} />${suffix}${info}${hintLine}${messageLine}${appendix}
</nx-formfield>`,
  imports: [
    `import { ${formfieldImports.join(', ')} } from '@allianz/ng-aquila/formfield';`,
    "import { NxInputDirective } from '@allianz/ng-aquila/input';",
    ...(baseImports.length
      ? [`import { ${baseImports.join(', ')} } from '@allianz/ng-aquila/base';`]
      : []),
    ...(showPrefixIcon || showPostfixButton
      ? ["import { NxIconComponent } from '@allianz/ng-aquila/icon';"]
      : []),
    ...(showPostfixButton
      ? ["import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';"]
      : []),
    ...(hasInfo ? ["import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';"] : []),
  ],
  id: 'nx-text-input',
  metadata: { nestable: true },
};
