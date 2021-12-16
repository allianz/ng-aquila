import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxAvatarComponent, NxAvatarButtonDirective } from './avatar';

@NgModule({
    imports: [CommonModule],
    declarations: [NxAvatarComponent, NxAvatarButtonDirective],
    exports: [NxAvatarComponent, NxAvatarButtonDirective],
})
export class NxAvatarModule {}
