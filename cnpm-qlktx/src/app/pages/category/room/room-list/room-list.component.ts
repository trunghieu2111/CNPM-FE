import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLogin } from 'src/app/services/service-login.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total: number = 0;

  flagPer = 1;

  constructor(public roomService: RoomService,
    public loginService: ServiceLogin,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.flagPer = this.loginService.flagPermission
    this.loadData();
  }
  public loadData() {
    this.roomService.getListRoom().subscribe((data) => {
      this.data = data;
      this.total = this.data.length;
    })
  }

  addRoom() {
    this.router.navigate(['category/room-form', 0]);
  }

  removeRoom(index: any) {
    this.roomService.deleteRoom(index).subscribe((data) => {
      this.loadData();
    });
  }

  editRoom(index: any) {
    this.router.navigate(['category/room-form', index]);
  }

  onKey(keyword: any) {
    this.roomService.getListRoom(keyword.target.value).subscribe((data) =>{
      this.data = data;
      this.total = this.data.length;
    })
    //console.log(keyword);
  }

  showRoomEmpty(){
    this.roomService.getRoomEmpty().subscribe((data) => {
      this.data = data;
      this.total = this.data.length;
    })
  }
}
