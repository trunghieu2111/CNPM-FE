import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDataRoom } from '../../invoice/data.model';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../room/room.service';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.scss']
})
export class AssetFormComponent implements OnInit {
  isShowCreateOrUpdate: boolean= false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');
  
  // selectedThang = "";
  // thangs = ['1', '2', '3', '4', '5', '6','7', '8','9', '10','11', '12'];

  submitForm: FormGroup;

  dataRoom:IDataRoom[] = [];
  selectedRoom = "";
  RoomIDs = [] as any;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    public roomService: RoomService,
    public assetService: AssetService,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      mataisai: [null, [Validators.required]],
      maphong: [null, [Validators.required]],
      tentaisan: [null, Validators.required],
      tinhtrang: "Chờ bàn giao",
      donvitinh: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    //console.log(ids);
    //this.isShowCreateOrUpdate = false;
    if (String(this.ids) !== '0') {
      this.isShowCreateOrUpdate = true;
      this.loadData(this.ids);
    }

    this.roomService.getListRoom().subscribe((data) => {
      this.dataRoom = data;
      for(const i in this.dataRoom){
        this.RoomIDs.push(this.dataRoom[i].id);
      }
    })
    
  }

  public loadData(id: any) {
    this.assetService.getInfoassetByID(id).subscribe((data) => {
      this.submitForm.patchValue({
        mataisai: data.mataisai,
        maphong: data.maphong,
        tentaisan: data.tentaisan,
        tinhtrang: data.tinhtrang,
        donvitinh: data.donvitinh
      })
      //console.log("data", data);
      //console.log("data:", data.sinhvienid);
      this.selectedRoom = data.maphong + "";
    });
  }

  onSubmit(){
    const valid = this.submitForm.valid;
    if(valid){
      if (this.isShowCreateOrUpdate) { // Update
        const params = {
          _id: this.ids,
          mataisai: this.submitForm.get('mataisai')?.value,
          maphong: this.submitForm.get('maphong')?.value,
          tentaisan: this.submitForm.get('tentaisan')?.value,
          tinhtrang: this.submitForm.get('tinhtrang')?.value,
          donvitinh: this.submitForm.get('donvitinh')?.value
        }
        this.assetService.updateasset(params).subscribe((data) => {
          this._location.back();
        })
        console.log("data:", params);
      } else { // CREATE
        const params = {
          mataisai: this.submitForm.get('mataisai')?.value,
          maphong: this.submitForm.get('maphong')?.value,
          tentaisan: this.submitForm.get('tentaisan')?.value,
          tinhtrang: this.submitForm.get('tinhtrang')?.value,
          donvitinh: this.submitForm.get('donvitinh')?.value
        }
        this.assetService.createasset(params).subscribe((data) => {
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
