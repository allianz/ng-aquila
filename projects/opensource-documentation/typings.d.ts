declare module '*.json' {
  const value: any;
  export default value;
}

declare function Egg(keySequence: string, fn: Function): void;
