import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  // isCollapsed = false;
  // constructor(
  //   private router: Router,
  // ) { }

  // chuyen(){
  //   this.router.navigate(['dashboard']);
  // }
}
