import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  isShowCreateOrUpdate: boolean= false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');

  selectedValue = null;
  sexs = ['Nam', 'Nữ'];
  
  submitForm: FormGroup;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    public studentService: StudentService,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      id: [null, [Validators.required]],
      hoten: [null, Validators.required],
      ngaysinh: [null, [Validators.required]],
      lop: [null, Validators.required],
      khoa: [null, Validators.required],
      gioitinh: [null, Validators.required],
      diachi: [null, Validators.required],
      sodienthoai: [null, Validators.required],
      // username: [null, Validators.required],
      // password: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    //console.log(ids);
    //this.isShowCreateOrUpdate = false;
    if (String(this.ids) !== '0') {
      this.isShowCreateOrUpdate = true;
      this.loadData(this.ids);
    }
  }

  public loadData(id: any) {
    this.studentService.getInfoStudentByID(id).subscribe((data) => {
      this.submitForm.patchValue({
        id: data.id,
        hoten: data.hoten,
        ngaysinh: data.ngaysinh,
        lop: data.lop,
        khoa: data.khoa,
        diachi: data.diachi,
        gioitinh: data.gioitinh,
        sodienthoai: data.sodienthoai
      })
      //console.log("data", data);
    });

    // this.studentService.getInfoUserByID(this.submitForm.get('id')?.value).subscribe((data) => {
    //   this.submitForm.patchValue({
    //     username: data.username,
    //     password: data.password
    //   })
    // });
  }

  onSubmit(){
    const valid = this.submitForm.valid;
    if(valid){
      if (this.isShowCreateOrUpdate) { // Update
        // const pars = {
        //   : this.submitForm.get('id')?.value,
        //   hoten: this.submitForm.get('hoten')?.value,
        // }
        const params = {
          _id: this.ids,
          id: this.submitForm.get('id')?.value,
          hoten: this.submitForm.get('hoten')?.value,
          ngaysinh: this.submitForm.get('ngaysinh')?.value,
          lop: this.submitForm.get('lop')?.value,
          khoa: this.submitForm.get('khoa')?.value,
          diachi: this.submitForm.get('diachi')?.value,
          gioitinh: this.submitForm.get('gioitinh')?.value,
          sodienthoai: this.submitForm.get('sodienthoai')?.value,
        }
        this.studentService.updateStudent(params).subscribe((data) => {
          this._location.back();
        })
      } else { // CREATE
        const params = {
          id: this.submitForm.get('id')?.value,
          hoten: this.submitForm.get('hoten')?.value,
          ngaysinh: this.submitForm.get('ngaysinh')?.value,
          lop: this.submitForm.get('lop')?.value,
          khoa: this.submitForm.get('khoa')?.value,
          diachi: this.submitForm.get('diachi')?.value,
          gioitinh: this.submitForm.get('gioitinh')?.value,
          sodienthoai: this.submitForm.get('sodienthoai')?.value,
        }
        this.studentService.createStudent(params).subscribe((data) => {
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
