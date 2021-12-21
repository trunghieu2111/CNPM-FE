import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  //{ path: 'layout', component: LayoutComponent },
  //{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'category', loadChildren: () => import('../pages/category/category.module').then(m => m.CategoryModule) },
  { path: 'report', loadChildren: () => import('../pages/report/report.module').then(m => m.ReportModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
