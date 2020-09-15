import { build } from './run-overview';
import * as path from 'path';

function run(source, dest) {
  return build({
    source: path.resolve(source),
    dest: path.resolve(dest)
  });
}

export default {
  run
};
