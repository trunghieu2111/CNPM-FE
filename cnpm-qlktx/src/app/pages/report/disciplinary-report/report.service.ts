import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class recordService extends ServiceBaseService{

  getListrecord(keyword: any = null){
    return this.get(`record${keyword?('?keyword='+keyword):''}`);
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  updaterecord(params: any){
    return this.post(`record/update/${params._id}`, params);
  }

  getInforecordByID(id: any){
    return this.get(`record/${id}`);
  }

  deleterecord(id: any){
    return this.delete(`record/delete/${id}`);
  }

  createrecord(params: any){
    return this.post(`record`, params);
  }
}