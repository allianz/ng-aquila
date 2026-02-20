import { inject, Injectable, Pipe, PipeTransform } from '@angular/core';

import { NX_DOC_VERSIONS } from './tokens';

@Injectable({ providedIn: 'root' })
export class NxvVersionHashService {
  private readonly versions = inject(NX_DOC_VERSIONS);

  appendVersion(url: string): string {
    if (!url) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${this.versions.currentVersion}`;
  }
}

@Pipe({
  name: 'versionHash',
  standalone: true,
})
export class NxvVersionHashPipe implements PipeTransform {
  private readonly versionHashService = inject(NxvVersionHashService);

  transform(url: string): string {
    return this.versionHashService.appendVersion(url);
  }
}
