interface MdSection {
  name: string;
  heading: string;
  level: number;
  content: string;
  doc: string;
}

export interface SectionDoc {
  name: string;
  category: string;
  sections: MdSection[];
  alias?: string[];
}
