import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IData } from 'src/app/pages/report/disciplinary-report/data.model';
import { RoomService } from '../../room/room.service';
import { StudentService } from '../../student/student.service';
import { IDataRoom } from '../data.model';
import { InvoiceService } from '../invoice.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  isShowCreateOrUpdate: boolean= false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');
  
  selectedThang = "";
  thangs = ['1', '2', '3', '4', '5', '6','7', '8','9', '10','11', '12'];

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
    public invoiceService: InvoiceService,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      id: [null, [Validators.required]],
      sinhvienid: [null, Validators.required],
      phongid: [null, [Validators.required]],
      thang: [null, Validators.required],
      nam: [null, Validators.required],
      chisodiendau: [null, Validators.required],
      chisodiencuoi: [null, Validators.required],
      chisonuocdau: [null, Validators.required],
      chisonuoccuoi: [null, Validators.required],
      tinhtranghoadon: "Chưa thanh toán"
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
    this.invoiceService.getInfobillByID(id).subscribe((data) => {
      this.submitForm.patchValue({
        id: data.id,
        sinhvienid: data.sinhvienid,
        phongid: data.phongid,
        thang: data.thang,
        nam: data.nam,
        chisodiendau: data.chisodiendau,
        chisodiencuoi: data.chisodiencuoi,
        chisonuocdau: data.chisonuocdau,
        chisonuoccuoi: data.chisonuoccuoi,
        tinhtranghoadon: data.tinhtranghoadon
      })
      //console.log("data", data);
      //console.log("data:", data.sinhvienid);
      this.selectedValue = data.sinhvienid + "";
      this.selectedRoom = data.phongid + "";
      this.selectedThang = data.thang + "";
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
          thang: this.submitForm.get('thang')?.value,
          nam: this.submitForm.get('nam')?.value,
          chisodiendau: this.submitForm.get('chisodiendau')?.value,
          chisodiencuoi: this.submitForm.get('chisodiencuoi')?.value,
          chisonuocdau: this.submitForm.get('chisonuocdau')?.value,
          chisonuoccuoi: this.submitForm.get('chisonuoccuoi')?.value,
          tinhtranghoadon: this.submitForm.get('tinhtranghoadon')?.value
        }
        this.invoiceService.updatebill(params).subscribe((data) => {
          this._location.back();
        })
        console.log("data:", params);
      } else { // CREATE
        const params = {
          id: this.submitForm.get('id')?.value,
          sinhvienid: this.submitForm.get('sinhvienid')?.value,
          phongid: this.submitForm.get('phongid')?.value,
          thang: this.submitForm.get('thang')?.value,
          nam: this.submitForm.get('nam')?.value,
          chisodiendau: this.submitForm.get('chisodiendau')?.value,
          chisodiencuoi: this.submitForm.get('chisodiencuoi')?.value,
          chisonuocdau: this.submitForm.get('chisonuocdau')?.value,
          chisonuoccuoi: this.submitForm.get('chisonuoccuoi')?.value,
          tinhtranghoadon: this.submitForm.get('tinhtranghoadon')?.value
        }
        this.invoiceService.createbill(params).subscribe((data) => {
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
