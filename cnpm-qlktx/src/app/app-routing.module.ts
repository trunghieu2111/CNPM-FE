import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {path: '', component: LayoutComponent, 
    children: [
    { path: 'category', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
    { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'report', loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule) },
  ]}
];
// { path: 'invoice', loadChildren: () => import('./pages/danhmuc/danhmuc.module').then(m => m.DanhmucModule) }
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
