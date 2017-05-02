import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthRequired } from '../core/auth-required.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [ AuthRequired ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
