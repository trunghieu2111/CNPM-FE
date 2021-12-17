import { Injectable } from '@angular/core';
import { ServiceBaseService } from 'src/app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends ServiceBaseService{

  getListRoom(keyword: any = null){
    return this.get(`room${keyword?('?keyword='+keyword):''}`);
  }
  // ${keyword?('?Keyword='+keyword):''} nếu tồn tại keyword thì thêm đoạn url sau nếu không thì rỗng;
  updateRoom(params: any){
    return this.post(`room/update/${params.id}`, params);
  }

//   getInfoRoomByID(id: any){
//     return this.get(`api/app/branch/${id}`);
//   }

  deleteRoom(id: any){
    return this.delete(`room/delete/${id}`);
  }

  createRoom(params: any){
    return this.post(`room`, params);
  }
}
