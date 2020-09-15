import { build } from './run-dgeni';
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
