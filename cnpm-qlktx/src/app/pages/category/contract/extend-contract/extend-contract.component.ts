import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-extend-contract',
  templateUrl: './extend-contract.component.html',
  styleUrls: ['./extend-contract.component.scss']
})
export class ExtendContractComponent implements OnInit {

  isShowCreateOrUpdate: boolean= false; //false: tạo, true: sửa
  ids = this.route.snapshot.paramMap.get('id');

  submitForm: FormGroup;

  data:any;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    public contractService: ContractService,
    public fb: FormBuilder,
  ) {
    this.submitForm = this.fb.group({
      ngayketthuc: [null, Validators.required],
      ngaybatdau: [null, Validators.required],
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
    this.contractService.getInfocontractByID(id).subscribe((data) => {
      this.data = data;
      this.submitForm.patchValue({
        ngaybatdau: data.ngaybatdau,
        ngayketthuc: data.ngayketthuc
      })
    });
  }

  onSubmit(){
    const valid = this.submitForm.valid;
    if(valid){
      if (this.isShowCreateOrUpdate) { // Update
        const params = {
          _id: this.data._id,
          id: this.data.id,
          sinhvienid: this.data.sinhvienid,
          phongid: this.data.phongid,
          ngaybatdau: this.data.ngaybatdau,
          ngayketthuc: this.submitForm.get('ngayketthuc')?.value,
          tinhtranghopdong: "Chờ gia hạn"
        }
        this.contractService.updatecontract(params).subscribe((data) => {
          this._location.back();
        })
      } else { // CREATE
        
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
