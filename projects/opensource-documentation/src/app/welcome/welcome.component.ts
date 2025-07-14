import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NxButtonComponent } from '../../../../ng-aquila/src/button/button.component';
import { NxColComponent } from '../../../../ng-aquila/src/grid/col.component';
import { NxLayoutComponent } from '../../../../ng-aquila/src/grid/layout.component';
import { NxRowComponent } from '../../../../ng-aquila/src/grid/row.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'doc-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxButtonComponent,
    RouterLink,
    FooterComponent,
  ],
})
export class WelcomeComponent {}
