import { ComponentHarness } from '@angular/cdk/testing';

/**
 * Base class for Controls to be used in NxFormfieldHarness
 *
 * This allows custom controls to be returned by NxFormfieldHarness.getControl()
 * with generic result typing.
 */
export class NxFormfieldControlHarness extends ComponentHarness {}
