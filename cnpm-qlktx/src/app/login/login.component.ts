import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLogin } from '../services/service-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  flag = true; //login

  constructor(
    private router: Router,
    private loginService: ServiceLogin
  ) { }

  chuyen(){
    // this.loginService.flagLogin = false;
    // this.flag = this.loginService.flagLogin;
    this.router.navigate(['/category'], { replaceUrl: true }); 

    // this.loginService.flagPermission = 1;
  }

  ngOnInit(): void {
  }

}
