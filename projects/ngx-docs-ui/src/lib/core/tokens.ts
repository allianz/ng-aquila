import { InjectionToken } from '@angular/core';

import { Manifest } from './manifest';
import { DocVersions, GithubLinkConfig, LogoPath, NxAnnouncement } from './types';

export const NXV_MANIFEST_TOKEN = new InjectionToken<{ value: Manifest }>('NXV_MANIFEST_TOKEN');
export const NX_DOC_VERSIONS = new InjectionToken<DocVersions>('NX_DOC_VERSIONS');
export const NX_DOCS_LOGO_PATH = new InjectionToken<LogoPath>('NX_DOCS_LOGO_PATH');
export const NXV_FOOTER = new InjectionToken<any>('NXV_FOOTER');
export const NXV_TOP_INFO = new InjectionToken<any>('NXV_TOP_INFO');
export const NXV_FEEDBACK_LINKS = new InjectionToken<any>('NXV_FEEDBACK_LINKS');
export const NX_DOCS_GITHUB_LINK = new InjectionToken<GithubLinkConfig>('NX_DOCS_GITHUB_LINK');
export const NX_ANNOUNCEMENT = new InjectionToken<NxAnnouncement>('NX_ANNOUNCEMENT');
