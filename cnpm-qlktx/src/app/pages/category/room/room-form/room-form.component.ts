import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../room.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {

  isShowCreateOrUpdate: boolean= false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');

  selectedValue = null;
  sexs = ['Nam', 'Nữ'];
  
  submitForm: FormGroup;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    public roomService: RoomService,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      id: [null, [Validators.required]],
      toanha: [null, Validators.required],
      tang: [null, [Validators.required]],
      sogiuong: [null, Validators.required],
      songuoitoida: [null, Validators.required],
      giaphong: [null, Validators.required],
      gioitinh: [null, Validators.required]
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
    this.roomService.getInfoRoomByID(id).subscribe((data) => {
      this.submitForm.patchValue({
        id: data.id,
        toanha: data.toanha,
        tang: data.tang,
        sogiuong: data.sogiuong,
        songuoitoida: data.songuoitoida,
        giaphong: data.giaphong,
        gioitinh: data.gioitinh
      })
      //console.log("data", data);
    });
  }

  onSubmit(){
    const valid = this.submitForm.valid;
    if(valid){
      if (this.isShowCreateOrUpdate) { // Update
        const params = {
          _id: this.ids,
          id: this.submitForm.get('id')?.value,
          toanha: this.submitForm.get('toanha')?.value,
          tang: this.submitForm.get('tang')?.value,
          sogiuong: this.submitForm.get('sogiuong')?.value,
          songuoitoida: this.submitForm.get('songuoitoida')?.value,
          giaphong: this.submitForm.get('giaphong')?.value,
          gioitinh: this.submitForm.get('gioitinh')?.value,
        }
        this.roomService.updateRoom(params).subscribe((data) => {
          this._location.back();
        })
      } else { // CREATE
        const params = {
          id: this.submitForm.get('id')?.value,
          toanha: this.submitForm.get('toanha')?.value,
          tang: this.submitForm.get('tang')?.value,
          sogiuong: this.submitForm.get('sogiuong')?.value,
          songuoitoida: this.submitForm.get('songuoitoida')?.value,
          giaphong: this.submitForm.get('giaphong')?.value,
          gioitinh: this.submitForm.get('gioitinh')?.value
        }
        this.roomService.createRoom(params).subscribe((data) => {
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
