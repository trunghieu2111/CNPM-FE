import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogin extends ServiceBaseService{
  flagPermission = "";
  //flagLogin = true;
  loginStudent(params: any){
    return this.post(`auth/login`, params);
  }
}