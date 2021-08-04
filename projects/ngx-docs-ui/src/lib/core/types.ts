export class DocVersions {
  currentChannel!: string;
  channels!: DocVersionChannel[];
  currentVersion!: string;
}

export class DocVersionChannel {
  name!: string;
  url!: string;
}

export class LogoPath {
 logoWithTitlePath!: string;
}

export class GithubLinkConfig {
  repoLink!: string;
  logoAltText!: string;
}

export type NxvDocumentationConfig = {
  welcomeComponent: any;
  footerComponent: any;
  topInfoComponent: any;
};
