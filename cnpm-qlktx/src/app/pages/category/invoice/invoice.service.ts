import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends ServiceBaseService{

  getListbill(keyword: any = null){
    return this.get(`bill${keyword?('?keyword='+keyword):''}`);
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  updatebill(params: any){
    return this.post(`bill/update/${params._id}`, params);
  }

  getInfobillByID(id: any){
    return this.get(`bill/${id}`);
  }

  deletebill(id: any){
    return this.delete(`bill/delete/${id}`);
  }

  createbill(params: any){
    return this.post(`bill`, params);
  }

//   getbillEmpty(){
//     return this.get(`/common/phong_con_trong`);
//   }
}
