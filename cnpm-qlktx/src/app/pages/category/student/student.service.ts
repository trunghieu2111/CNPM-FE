import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends ServiceBaseService{

  getListStudent(keyword: any = null){
    return this.get(`student${keyword?('?keyword='+keyword):''}`);
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  updateStudent(params: any){
    return this.post(`student/update/${params._id}`, params);
  }

  getInfoStudentByID(id: any){
    return this.get(`student/${id}`);
  }

  deleteStudent(id: any){
    return this.delete(`student/delete/${id}`);
  }

  createStudent(params: any){
    return this.post(`student`, params);
  }

  updateUser(params: any){
    return this.post(`user/update/${params._id}`, params);
  }

  getInfoUserByID(id: any){
    return this.get(`user/id_student/${id}`);
  }

  deleteUser(id: any){
    return this.delete(`user/delete/${id}`);
  }

  createUser(params: any){
    return this.post(`user`, params);
  }
}