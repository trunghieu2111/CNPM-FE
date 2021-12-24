import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService extends ServiceBaseService{

  getListasset(keyword: any = null){
    return this.get(`asset${keyword?('?keyword='+keyword):''}`);
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  updateasset(params: any){
    return this.post(`asset/update/${params._id}`, params);
  }

  getInfoassetByID(id: any){
    return this.get(`asset/${id}`);
  }

  deleteasset(id: any){
    return this.delete(`asset/delete/${id}`);
  }

  createasset(params: any){
    return this.post(`asset`, params);
  }

  showAsset(id: any){
    return this.get(`asset?maphong=${id}`);
  }
}