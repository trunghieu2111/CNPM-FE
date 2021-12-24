import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IData } from 'src/app/pages/report/disciplinary-report/data.model';
import { IDataRoom } from '../../invoice/data.model';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../room/room.service';
import { StudentService } from '../../student/student.service';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent implements OnInit {

  isShowCreateOrUpdate: boolean= false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');

  submitForm: FormGroup;

  dataSV:IData[] = [];
  selectedValue = "";
  SVIDs = [] as any;

  dataRoom:IDataRoom[] = [];
  selectedRoom = "";
  RoomIDs = [] as any;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    public roomService: RoomService,
    public studentService: StudentService,
    public contractService: ContractService,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      id: [null, [Validators.required]],
      sinhvienid: [null, Validators.required],
      phongid: [null, [Validators.required]],
      ngaybatdau: [null, Validators.required],
      ngayketthuc: [null, Validators.required],
      tinhtranghopdong: "Đã hoàn thành"
    })
  }

  ngOnInit(): void {
    //console.log(ids);
    //this.isShowCreateOrUpdate = false;
    if (String(this.ids) !== '0') {
      this.isShowCreateOrUpdate = true;
      this.loadData(this.ids);
    }

    this.studentService.getListStudent().subscribe((data) => {
      this.dataSV = data;
      //console.log("test", this.dataSV);
      for(const i in this.dataSV){
        this.SVIDs.push(this.dataSV[i].id);
      }
      // console.log("dataID:", this.SVIDs);
    })

    this.roomService.getListRoom().subscribe((data) => {
      this.dataRoom = data;
      for(const i in this.dataRoom){
        this.RoomIDs.push(this.dataRoom[i].id);
      }
    })
    
  }

  public loadData(id: any) {
    this.contractService.getInfocontractByID(id).subscribe((data) => {
      this.submitForm.patchValue({
        id: data.id,
        sinhvienid: data.sinhvienid,
        phongid: data.phongid,
        ngaybatdau: data.ngaybatdau,
        ngayketthuc: data.ngayketthuc,
        tinhtranghopdong: data.tinhtranghopdong
      })
      //console.log("data", data);
      //console.log("data:", data.sinhvienid);
      this.selectedValue = data.sinhvienid + "";
      this.selectedRoom = data.phongid + "";
    });
  }

  onSubmit(){
    const valid = this.submitForm.valid;
    if(valid){
      if (this.isShowCreateOrUpdate) { // Update
        const params = {
          _id: this.ids,
          id: this.submitForm.get('id')?.value,
          sinhvienid: this.submitForm.get('sinhvienid')?.value,
          phongid: this.submitForm.get('phongid')?.value,
          ngaybatdau: this.submitForm.get('ngaybatdau')?.value,
          ngayketthuc: this.submitForm.get('ngayketthuc')?.value,
          tinhtranghopdong: this.submitForm.get('tinhtranghopdong')?.value
        }
        this.contractService.updatecontract(params).subscribe((data) => {
          this._location.back();
        })
        //console.log("data:", params);
      } else { // CREATE
        const params = {
          id: this.submitForm.get('id')?.value,
          sinhvienid: this.submitForm.get('sinhvienid')?.value,
          phongid: this.submitForm.get('phongid')?.value,
          ngaybatdau: this.submitForm.get('ngaybatdau')?.value,
          ngayketthuc: this.submitForm.get('ngayketthuc')?.value,
          tinhtranghopdong: this.submitForm.get('tinhtranghopdong')?.value
        }
        this.contractService.createcontract(params).subscribe((data) => {
          this._location.back();
        })
      }
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
