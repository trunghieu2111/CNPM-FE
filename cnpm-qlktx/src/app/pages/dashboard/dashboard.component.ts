import { Component, OnInit } from '@angular/core';
import { ContractService } from '../category/contract/contract.service';
import { RoomService } from '../category/room/room.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataRoom :any;
  dataRoomEmpty :any;
  roomEmpty:number = 0;
  roomFull:number = 0;
  total:number = 0;

  contractData:any;
  contractLength:number = 0;
  constructor(
    public roomService: RoomService,
    public contractService:ContractService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.roomService.getListRoom().subscribe((data) => {
      this.dataRoom = data;
      this.total = this.dataRoom.length;
    })

    this.roomService.getRoomEmpty().subscribe((data) => {
      this.dataRoomEmpty = data;
      this.roomEmpty = this.dataRoomEmpty.length;
    })

    this.roomFull = this.total - this.roomEmpty;

    this.contractService.getListcontract().subscribe((data) => {
      this.contractData = data;
      this.contractLength = this.contractData.length;
    })

  }


}
