import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';
import { ServiceLogin } from 'src/app/services/service-login.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  isShowCreateOrUpdate: boolean = false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');

  checked = false;
  idStudent = "";
  dataUser: any;

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
      username: [null, Validators.required],
      password: [null, Validators.required]
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
      //console.log("data", data.id);
      this.idStudent = data.id + "";
    });

    // console.log("idsv:", this.idStudent);
    // this.studentService.getInfoUserByID(this.idStudent).subscribe((data) => {
    //   this.dataUser = data;
    //   console.log("data:", this.dataUser);
    //   this.submitForm.patchValue({
    //     username: data.username,
    //     password: data.password
    //   })
    // });
  }

  loadTK() {
    this.checked = true;
    //console.log("idsv:", this.idStudent);
    if (String(this.ids) !== '0') {
      this.studentService.getInfoUserByID(this.idStudent).subscribe((data) => {
        this.dataUser = data;
        console.log("data:", this.dataUser);
        this.submitForm.patchValue({
          username: data[0].username,
          password: data[0].password
        })
      });
    }
    
  }

  onSubmit() {
    const valid = this.submitForm.valid;
    if (valid) {
      if (this.isShowCreateOrUpdate) { // Update
        const pars = {
          username: this.submitForm.get('username')?.value,
          password: this.submitForm.get('password')?.value,
          role: "student",
          id_student: this.submitForm.get('id')?.value,
          _id: this.dataUser[0]._id,
          tokens: []
        }
        this.studentService.updateUser(pars).subscribe((data) => {
        })

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
        const pars = {
          username: this.submitForm.get('username')?.value,
          password: this.submitForm.get('password')?.value,
          role: "student",
          id_student: this.submitForm.get('id')?.value,
          tokens: []
        }
        this.studentService.createUser(pars).subscribe((data) => {
        })

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
