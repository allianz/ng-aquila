
function fileList(files) {
  return files.map(file => `--files ${file}`).join(' ');
}

module.exports = {
  'projects/ng-aquila/!(documentation)/**/!(*.spec).ts': (files) => `ng lint ng-aquila --fix ${fileList(files)}`,
  'projects/ng-aquila/!(documentation)/!(schematics)/*.spec.ts': (files) => `ng lint ng-aquila --fix --ts-config projects/ng-aquila/tsconfig.spec.json ${fileList(files)}`,
  'projects/ngx-docs-ui/**/!(*.spec).ts': (files) => `ng lint ngx-docs-ui --fix ${fileList(files)}`,
  'projects/ngx-docs-ui/**/*.spec.ts': (files) => `ng lint ngx-docs-ui --fix --ts-config projects/ngx-docs-ui/tsconfig.spec.json ${fileList(files)}`,
  'projects/opensource-documentation/**/*.ts': (files) => `ng lint opensource-documentation --fix ${fileList(files)}`,
  '*.scss': 'npm run lint:scss'
}
