import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LayoutComponent} from "./layout/layout.component";
import {LoginComponent} from "./layout/login/login.component";
// import { LayoutComponent } from './layout/layout.component';
//import { LayoutModule } from './layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
      // },
      {
        path: 'login',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
      },
    ],
  },
  // { path: '', component: AppComponent },
  // { path: 'login', component: AppComponent },
  // { path: 'layout', component: LayoutComponent }
  // { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  // { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  // { path: 'category', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
  // { path: 'report', loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
