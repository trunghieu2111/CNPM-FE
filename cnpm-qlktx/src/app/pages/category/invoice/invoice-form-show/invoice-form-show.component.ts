import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IData } from 'src/app/pages/report/disciplinary-report/data.model';
import { IDataRoom } from '../data.model';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../room/room.service';
import { StudentService } from '../../student/student.service';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-form-show',
  templateUrl: './invoice-form-show.component.html',
  styleUrls: ['./invoice-form-show.component.scss']
})
export class InvoiceFormShowComponent implements OnInit {

  ids = this.route.snapshot.paramMap.get('id');
  Tinhtien = 0;
  Tiennuoc = 0;

  selectedThang = "";
  thangs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  submitForm: FormGroup;

  dataSV: IData[] = [];
  selectedValue = "";
  SVIDs = [] as any;

  dataRoom: IDataRoom[] = [];
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
      tinhtranghoadon: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadData(this.ids);

    this.studentService.getListStudent().subscribe((data) => {
      this.dataSV = data;
      //console.log("test", this.dataSV);
      for (const i in this.dataSV) {
        this.SVIDs.push(this.dataSV[i].id);
      }
      // console.log("dataID:", this.SVIDs);
    })

    this.roomService.getListRoom().subscribe((data) => {
      this.dataRoom = data;
      for (const i in this.dataRoom) {
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
      this.Tinhtien = (data.chisodiencuoi - data.chisodiendau) * 2000;
      this.Tiennuoc = (data.chisonuoccuoi - data.chisonuocdau) * 10000;
    });
  }

  onSubmit() {
    const valid = this.submitForm.valid;
    if (valid) {
      // Update Trạng thái Invoice
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
        tinhtranghoadon: "Đã thanh toán"
      }
      console.log("data:", params);
      // this.invoiceService.updatebill(params).subscribe((data) => {
      //   this._location.back();
      // })

    } else {
      for (const i in this.submitForm.controls) {
        if (this.submitForm.controls.hasOwnProperty(i)) {
          this.submitForm.controls[i].markAsDirty();
          this.submitForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }

  back() {
    this._location.back();
  }
}
