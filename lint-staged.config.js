
function fileList(files) {
  return files.map(file => `--files ${file}`).join(' ');
}

module.exports = {
  'projects/ng-aquila/!(documentation)/**/*.ts': (files) => `ng lint ng-aquila --fix ${fileList(files)}`,
  'projects/ngx-docs-ui/**/*.ts': (files) => `ng lint ngx-docs-ui --fix ${fileList(files)}`,
  'projects/opensource-documentation/**/*.ts': (files) => `ng lint opensource-documentation --fix ${fileList(files)}`,
  '*.scss': 'npm run lint:scss'
}
