import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDataRoom } from '../../invoice/data.model';
import { RoomService } from '../../room/room.service';
import { ContractService } from '../contract.service';
import { ServiceLogin } from 'src/app/services/service-login.service';

@Component({
  selector: 'app-registercontract',
  templateUrl: './registercontract.component.html',
  styleUrls: ['./registercontract.component.scss']
})
export class RegistercontractComponent implements OnInit {

  submitForm: FormGroup;

  dataRoom:IDataRoom[] = [];
  selectedRoom = "";
  RoomIDs = [] as any;

  flagStudentId ="";

  constructor(
    private _location: Location,
    public roomService: RoomService,
    public contractService: ContractService,
    public loginService: ServiceLogin,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      phongid: [null, [Validators.required]],
      ngaybatdau: [null, Validators.required],
      ngayketthuc: [null, Validators.required],
      tinhtranghopdong: "Chờ duyệt đăng kí"
    })
  }

  ngOnInit(): void {
    this.flagStudentId = this.loginService.flagSinhvienId;
    this.roomService.getListRoom().subscribe((data) => {
      this.dataRoom = data;
      for(const i in this.dataRoom){
        this.RoomIDs.push(this.dataRoom[i].id);
      }
    })
    
  }

  onSubmit(){
    const valid = this.submitForm.valid;
    if(valid){
        const params = {
          id: this.flagStudentId,
          sinhvienid: this.flagStudentId,
          phongid: this.submitForm.get('phongid')?.value,
          ngaybatdau: this.submitForm.get('ngaybatdau')?.value,
          ngayketthuc: this.submitForm.get('ngayketthuc')?.value,
          tinhtranghopdong: this.submitForm.get('tinhtranghopdong')?.value
        }
        this.contractService.createcontract(params).subscribe((data) => {
          this._location.back();
        })

    }else{
      for (const i in this.submitForm.controls) {
        if (this.submitForm.controls.hasOwnProperty(i)) {
          this.submitForm.controls[i].markAsDirty();
          this.submitForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }

  back(){
    this._location.back();
  }
}
