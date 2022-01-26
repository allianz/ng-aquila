import * as fs from 'fs-extra';
import * as path from 'path';

import { lazyServiceTemplate } from './template';

export const generateLazyLoadingService = (groupedMetadata, serviceOutputPath) => {
    const template = lazyServiceTemplate(groupedMetadata);
    fs.outputFileSync(path.join(serviceOutputPath, 'lazy-loading.service.ts'), template);
};
