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

export interface NxvDocumentationConfig {
    welcomeComponent: any;
    footerComponent: any;
}

export interface NxAnnouncement {
    title: string;
    link?: {
        title: string;
        url: string;
    };
    endTime: Date;
}
