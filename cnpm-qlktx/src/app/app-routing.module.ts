import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
// import { LayoutComponent } from './layout/layout.component';
//import { LayoutModule } from './layout/layout.module';

const routes: Routes = [
  { path: '', component: AppComponent },
  // { path: 'login', component: AppComponent },
  // { path: 'layout', component: LayoutComponent }
  // { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
   { path: 'layout', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  // { path: 'category', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
  // { path: 'report', loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }