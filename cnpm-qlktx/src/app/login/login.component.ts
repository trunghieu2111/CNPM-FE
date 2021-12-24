import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLogin } from '../services/service-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Notifi = "";
  Username = '';
  Password = '';

  constructor(
    private router: Router,
    private loginService: ServiceLogin
  ) { }

  submitLogin(){
    //this.router.navigate(['/dashboard'], { replaceUrl: true });
    const params = {
      username: this.Username,
      password: this.Password
    }
    this.loginService.loginStudent(params).subscribe((data) => {
      if(data.status == "success"){
        this.loginService.flagPermission = data.user.role;
        
        if(data.user.role == "student"){
          this.loginService.flagSinhvienId = data.user.id_student;
        }
        //console.log("role:", data.user.role);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }
      else{
        this.Notifi = "Sai tài khoản hoặc mật khẩu!";
      }
    })
  }

  ngOnInit(): void {
  }

  // ! tồn tại

}
