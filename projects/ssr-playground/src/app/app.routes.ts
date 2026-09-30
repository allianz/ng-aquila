import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'page/:id', component: PageComponent },
  { path: '**', redirectTo: '' },
];
