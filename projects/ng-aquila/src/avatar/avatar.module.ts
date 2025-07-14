import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxAvatarButtonDirective, NxAvatarComponent } from './avatar';

@NgModule({
  imports: [CommonModule, NxAvatarComponent, NxAvatarButtonDirective],
  exports: [NxAvatarComponent, NxAvatarButtonDirective],
})
export class NxAvatarModule {}
