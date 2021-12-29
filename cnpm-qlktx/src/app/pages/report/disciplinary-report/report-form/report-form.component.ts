import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { recordService } from '../report.service';
import { StudentService } from 'src/app/pages/category/student/student.service';
import { IData } from '../data.model';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {

  isShowCreateOrUpdate: boolean= false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');
  
  submitForm: FormGroup;

  dataSV:IData[] = [];
  selectedValue = "";
  SVIDs = [] as any;
  // TenSV = [] as any;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    public reportService: recordService,
    public studentService: StudentService,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      id: [null, [Validators.required]],
      sinhvienid: [null, Validators.required],
      noidungvipham: [null, [Validators.required]],
      thoigianvipham: [null, Validators.required],
      hinhthuckiluat: [null, Validators.required],
      thoigiankiluat: [null, Validators.required]
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
        // this.TenSV.push(this.dataSV[i].hoten);
      }
      // console.log("dataID:", this.SVIDs);
    })
    
  }

  public loadData(id: any) {
    this.reportService.getInforecordByID(id).subscribe((data) => {
      this.submitForm.patchValue({
        id: data.id,
        sinhvienid: data.sinhvienid,
        noidungvipham: data.noidungvipham,
        thoigianvipham: data.thoigianvipham,
        hinhthuckiluat: data.hinhthuckiluat,
        thoigiankiluat: data.thoigiankiluat
      })
      //console.log("data", data);
      //console.log("data:", data.sinhvienid);
      this.selectedValue = data.sinhvienid + "";
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
          noidungvipham: this.submitForm.get('noidungvipham')?.value,
          thoigianvipham: this.submitForm.get('thoigianvipham')?.value,
          hinhthuckiluat: this.submitForm.get('hinhthuckiluat')?.value,
          thoigiankiluat: this.submitForm.get('thoigiankiluat')?.value
        }
        this.reportService.updaterecord(params).subscribe((data) => {
          this._location.back();
        })
      } else { // CREATE
        const params = {
          id: this.submitForm.get('id')?.value,
          sinhvienid: this.submitForm.get('sinhvienid')?.value,
          noidungvipham: this.submitForm.get('noidungvipham')?.value,
          thoigianvipham: this.submitForm.get('thoigianvipham')?.value,
          hinhthuckiluat: this.submitForm.get('hinhthuckiluat')?.value,
          thoigiankiluat: this.submitForm.get('thoigiankiluat')?.value
        }
        this.reportService.createrecord(params).subscribe((data) => {
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
