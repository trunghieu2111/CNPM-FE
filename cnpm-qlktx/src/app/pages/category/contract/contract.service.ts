import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends ServiceBaseService{

  getListcontract(keyword: any = null){
    return this.get(`contract${keyword?('?keyword='+keyword):''}`);
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  updatecontract(params: any){
    return this.post(`contract/update/${params._id}`, params);
  }

  getInfocontractByID(id: any){
    return this.get(`contract/${id}`);
  }

  deletecontract(id: any){
    return this.delete(`contract/delete/${id}`);
  }

  createcontract(params: any){
    return this.post(`contract`, params);
  }

//   getcontractEmpty(){
//     return this.get(`/common/phong_con_trong`);
//   }
}
