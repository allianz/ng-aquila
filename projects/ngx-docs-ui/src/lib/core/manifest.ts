export type STATUS_TYPE = 'done' | 'progress' | 'na';

export interface Manifest {
    components: ComponentDescriptor[];
    guides: GuideDescriptor[];
    examples: ExampleDescriptor[];
    api: ApiDescriptor[];
}

export interface ComponentDescriptor {
    id: string;
    examples: object[];
    title: string;
    category: string;
    apiFile: string;
    overviewFile: string;
    noApi: boolean;
    b2c: boolean;
    expert: boolean;
    deprecated: boolean;
    stable: STATUS_TYPE;
}

export interface GuideDescriptor {
    id: string;
    title: string;
    file: string;
}

export interface ApiDescriptor {
    id: string;
}

export interface ExampleDescriptor {
    id: string;
    module: string;
    title: string;
    url: string;
    types: string[];
}
