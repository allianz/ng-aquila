const fs = require('fs');
const path = require('path');
const { parseArgs } = require('util');

const OUTPUT = path.resolve(__dirname, '../figma.config.json');

const { values } = parseArgs({ options: { url: { type: 'string' }, label: { type: 'string' } } });
const url = values.url ?? process.env.FIGMA_A1_FILE_URL;
const label = values.label ?? process.env.FIGMA_CODE_CONNECT_LABEL;

if (!url || !label) {
  console.error(
    'Missing the Figma file URL or the label. Pass --url=<url> and --label=<label>, or set FIGMA_A1_FILE_URL and FIGMA_CODE_CONNECT_LABEL.',
  );
  process.exit(1);
}

const config = {
  codeConnect: {
    include: ['projects/ng-aquila/src/**/*.figma.ts'],
    label,
    language: 'html',
    documentUrlSubstitutions: { '<A1_FILE>': url },
  },
};

fs.writeFileSync(OUTPUT, `${JSON.stringify(config, null, 2)}\n`);
console.log('Wrote figma.config.json');
