export interface ExampleItem {
  id: string;
  title: string;
  component: any;
}

export interface ExampleList {
  [key: string]: ExampleItem;
}
