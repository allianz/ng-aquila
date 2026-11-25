// url=<A1_FILE>?node-id=27453-19383
// source=projects/ng-aquila/src/message/message/message.component.ts
// component=NxMessageComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

// The code has no headline input. Examples put a bold span and a <br /> in front of the text.
const headline = instance.getBoolean('Headline') ? instance.getString('Headline Text') : undefined;
const closable = instance.getBoolean('Closable');
const showActions = instance.getBoolean('Actions');
// `getSlot()` only returns a marker, so the connected buttons in the slot render their own snippets.
const actionsSlot = showActions ? instance.getSlot('Actions Slot') : undefined;
const actionButtons = actionsSlot?.connectedInstances ?? [];
const actionExamples = actionButtons.map((button) => button.executeTemplate().example);
// `executeTemplate()` returns no imports, so the buttons' imports are added here.
const BUTTON_CLASSES: Record<string, string> = {
  'Contained Button': 'NxButtonComponent',
  'Plain Button': 'NxPlainButtonComponent',
};
const buttonClasses = actionButtons
  .map((button) => BUTTON_CLASSES[button.name])
  .filter((name, index, all) => !!name && all.indexOf(name) === index);
const actions = actionExamples.length
  ? actionExamples.reduce<unknown>(
      (all, example, index) => (index ? figma.html`${all}\n  ${example}` : example),
      undefined,
    )
  : actionsSlot;

const [signal] = instance.findLayers(
  (n) => n.type === 'INSTANCE' && n.name.startsWith('Functional Signal Filled Icon Presets'),
  { traverseInstances: true },
);
const context =
  signal?.type === 'INSTANCE'
    ? signal.getEnum('Signal Type', {
        Info: 'info',
        Critical: 'critical',
        Positive: 'positive',
        Warning: 'warning',
      })
    : undefined;
const contextNote = context
  ? ''
  : '<!-- The signal type is not available. Set context to "info", "critical", "positive" or "warning". -->\n';

const attributes = `${context ? ` context="${context}"` : ''}${
  closable ? ' closable closeButtonLabel="Add a label for the close button"' : ''
}`;

export default {
  example: figma.html`${contextNote}<nx-message${attributes}>${
    headline
      ? figma.html`
  <span class="nx-font-weight-bold">${headline}</span><br />`
      : ''
  }
  ${instance.getString('Message Text')}${
    !showActions
      ? ''
      : actionsSlot
        ? figma.html`
  <!-- nx-message has no actions slot in code yet. These buttons need their own layout styling. -->
  ${actions}`
        : `
  <!-- Could not find the Actions slot in Figma. -->`
  }
</nx-message>`,
  imports: [
    "import { NxMessageComponent } from '@allianz/ng-aquila/message';",
    ...(buttonClasses.length
      ? [`import { ${buttonClasses.join(', ')} } from '@allianz/ng-aquila/button';`]
      : []),
  ],
  id: 'nx-message-contained',
  metadata: { nestable: true },
};
