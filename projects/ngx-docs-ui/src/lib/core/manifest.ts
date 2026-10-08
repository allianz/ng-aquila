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
  slotsFile: string;
  noApi: boolean;
  b2c: boolean;
  expert: boolean;
  deprecated: boolean;
  stable: STATUS_TYPE;
  private: boolean;
  a1?: boolean;
  a1Full?: boolean;
  a1Light?: boolean;
  a1Densities?: boolean;
  alias?: string;
  group?: string | string[];
}

export interface GuideDescriptor {
  id: string;
  title: string;
  file: string;
}

export interface ApiDescriptor {
  id: string;
  hasSlots?: boolean;
}

export interface ExampleDescriptor {
  id: string;
  module: string;
  title: string;
  url: string;
  types: string[];
}
