import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../asset.service';
import {Location} from '@angular/common';
import { IDataRoom } from '../../invoice/data.model';
import { RoomService } from '../../room/room.service';
import { StudentService } from '../../student/student.service';
import { ServiceLogin } from 'src/app/services/service-login.service';

@Component({
  selector: 'app-show-asset-in-room',
  templateUrl: './show-asset-in-room.component.html',
  styleUrls: ['./show-asset-in-room.component.scss']
})
export class ShowAssetInRoomComponent implements OnInit {
  Status = "";
  flagPer = "";
  dataLength:number = 0;

  dataAsset:any;

  dataRoom:IDataRoom[] = [];
  selectedRoom = "";
  RoomIDs = [] as any;

  constructor(
    private _location: Location,
    public assetService: AssetService,
    public roomService: RoomService,
    public loginService: ServiceLogin,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.flagPer = this.loginService.flagPermission;
    this.roomService.getListRoom().subscribe((data) => {
      this.dataRoom = data;
      for(const i in this.dataRoom){
        this.RoomIDs.push(this.dataRoom[i].id);
      }
    })
  }

  onSubmitAdmin() {
    for(let data of this.dataAsset){
      const params = {
        _id: data._id,
        mataisai: data.mataisai,
        maphong: data.maphong,
        tentaisan: data.tentaisan,
        tinhtrang: "Chờ kí nhận",
        donvitinh: data.donvitinh
      }
      this.assetService.updateasset(params).subscribe((data) => {
        this.router.navigate(['category/asset-list']);
      })
    }
      
  }

  onSubmitStudent(){
    for(let data of this.dataAsset){
      const params = {
        _id: data._id,
        mataisai: data.mataisai,
        maphong: data.maphong,
        tentaisan: data.tentaisan,
        tinhtrang: "Đã hoàn thành",
        donvitinh: data.donvitinh
      }
      this.assetService.updateasset(params).subscribe((data) => {
        this.router.navigate(['category/asset-list']);
      })
    }
  }

  back() {
    this._location.back();
  }

  dataChanged(keyword: any) {
    this.Status = "";
    this.assetService.showAsset(keyword).subscribe((data) =>{
      this.dataAsset = data;
      //lấy data thứ 0
      if(data.length != 0){
        this.Status = data[0].tinhtrang;
      }
    })
    
  }
}
