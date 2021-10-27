module.exports = {
  'projects/ng-aquila/!(documentation)/**/!(*.spec).ts': (files) => files.map(file => `tslint -c projects/ng-aquila/tslint.json -p projects/ng-aquila/tsconfig.lib.json -e **/node_modules/** --fix ${file}`),
  'projects/ng-aquila/!(documentation)/!(schematics)/*.spec.ts': (files) => files.map(file => `tslint -c projects/ng-aquila/tslint.json -p projects/ng-aquila/tsconfig.spec.json -e **/node_modules/** --fix ${file}`),
  'projects/ngx-docs-ui/**/!(*.spec).ts': (files) => files.map(file => `tslint -c projects/ngx-docs-ui/tslint.json -p projects/ngx-docs-ui/tsconfig.lib.json -e **/node_modules/** --fix ${file}`),
  'projects/ngx-docs-ui/**/*.spec.ts': (files) => files.map(file => `tslint -c projects/ngx-docs-ui/tslint.json -p projects/ngx-docs-ui/tsconfig.spec.json -e **/node_modules/** --fix ${file}`),
  'projects/opensource-documentation/**/*.ts': (files) => files.map(file => `tslint -c projects/opensource-documentation/tslint.json opensource-documentation -p projects/opensource-documentation/tsconfig.app.json -e **/node_modules/** --fix ${file}`),
  '*.scss': 'npm run lint:scss'
}
