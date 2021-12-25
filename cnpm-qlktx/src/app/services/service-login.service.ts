import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogin extends ServiceBaseService{
  flagPermission:any = localStorage.getItem('flagPermission')?(localStorage.getItem('flagPermission')):"";
  flagSinhvienId:any =  localStorage.getItem('flagSinhvienId')?(localStorage.getItem('flagSinhvienId')):"";
  //localStorage.getItem('birthday')
  //flagLogin = true;
  loginStudent(params: any){
    return this.post(`auth/login`, params);
  }
}