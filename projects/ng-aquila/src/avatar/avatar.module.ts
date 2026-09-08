import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxAvatarButtonDirective, NxAvatarComponent, NxAvatarIndicatorDirective } from './avatar';

@NgModule({
  imports: [CommonModule, NxAvatarComponent, NxAvatarButtonDirective, NxAvatarIndicatorDirective],
  exports: [NxAvatarComponent, NxAvatarButtonDirective, NxAvatarIndicatorDirective],
})
export class NxAvatarModule {}
