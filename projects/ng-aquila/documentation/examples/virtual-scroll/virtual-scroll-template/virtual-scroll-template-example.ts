import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { NxListComponent } from '@allianz/ng-aquila/list';
import {
  NxVirtualFor,
  NxVirtualViewportComponent,
} from '@allianz/ng-aquila/virtual-scroll';
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * @title Custom item template example
 */
@Component({
  selector: 'virtual-scroll-template-example',
  templateUrl: './virtual-scroll-template-example.html',
  styleUrls: ['./virtual-scroll-template-example.css'],
  imports: [NxVirtualViewportComponent, NxVirtualFor, NxLinkComponent],
})
export class VirtualScrollTemplateExampleComponent {
  readonly users: User[] = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));
}
