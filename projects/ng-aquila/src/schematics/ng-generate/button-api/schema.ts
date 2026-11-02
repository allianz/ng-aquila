export interface Schema {
  /** Name of the project. */
  project?: string;

  /** Directory to migrate. Defaults to the source root of the project. */
  path?: string;
}
