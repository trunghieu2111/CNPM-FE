import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
<!--        <abp-loader-bar></abp-loader-bar>-->
<!--    <app-page-layout></app-page-layout>-->
    <router-outlet></router-outlet>

<!--    <abp-dynamic-layout></abp-dynamic-layout>-->
  `,
})
export class AppComponent {
  // isCollapsed = false;
  constructor(
    private router: Router,
  ) { }

  chuyen(){
    this.router.navigate(['dashboard']);
  }
}
