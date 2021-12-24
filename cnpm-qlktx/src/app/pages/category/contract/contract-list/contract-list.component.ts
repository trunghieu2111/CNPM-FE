import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLogin } from 'src/app/services/service-login.service';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {

  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total: number = 0;

  dataOneStudent: any;
  //confirmRegister:any;

  flagPer = "";
  flagStudentId = "";

  Onestudent = 0;

  constructor(public contractService: ContractService,
    public loginService: ServiceLogin,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.flagPer = this.loginService.flagPermission;
    this.flagStudentId = this.loginService.flagSinhvienId;
    //console.log("id", this.flagStudentId);
    this.loadData();
  }
  public loadData() {
    this.contractService.getListcontract().subscribe((data) => {
      this.data = data;
      this.total = this.data.length;
    })

    this.contractService.getcontractStudentId(this.flagStudentId).subscribe((data) => {
      this.dataOneStudent = data;
      this.Onestudent = this.dataOneStudent.length;
    })
  }

  addContract() {
    this.router.navigate(['category/contract-form', 0]);
  }

  removeContract(index: any) {
    this.contractService.deletecontract(index).subscribe((data) => {
      this.loadData();
    });
  }

  editContract(index: any) {
    this.router.navigate(['category/contract-form', index]);
  }

  onKey(keyword: any) {
    this.contractService.getListcontract(keyword.target.value).subscribe((data) => {
      this.data = data;
      this.total = this.data.length;
    })
    //console.log(keyword);
  }

  //duyệt gia hạn
  extendContract(index: any) {
    this.contractService.getInfocontractByID(index).subscribe((data) => {
      // this.confirmRegister = data;
      //console.log("data:", this.confirmRegister);
      if (data.tinhtranghopdong == "Chờ gia hạn") {
        const params = {
          _id: index,
          id: data.id,
          sinhvienid: data.sinhvienid,
          phongid: data.phongid,
          ngaybatdau: data.ngaybatdau,
          ngayketthuc: data.ngayketthuc,
          tinhtranghopdong: "Đã gia hạn"
        }
        //console.log(this.dataOneStudent[0]._id);
        this.contractService.updatecontract(params).subscribe((data) => {
          this.loadData();
        })
      }

    });
  }
  //duyệt đăng kí ở
  confirmRegisterContract(index: any) {
    this.contractService.getInfocontractByID(index).subscribe((data) => {
      // this.confirmRegister = data;
      //console.log("data:", this.confirmRegister);
      if (data.tinhtranghopdong == "Chờ duyệt đăng kí") {
        const params = {
          _id: index,
          id: data.id,
          sinhvienid: data.sinhvienid,
          phongid: data.phongid,
          ngaybatdau: data.ngaybatdau,
          ngayketthuc: data.ngayketthuc,
          tinhtranghopdong: "Đã duyệt đăng kí"
        }
        //console.log(this.dataOneStudent[0]._id);
        this.contractService.updatecontract(params).subscribe((data) => {
          this.loadData();
        })
      }

    });
    //console.log("data:", this.confirmRegister);
    // console.log(index)
  }
  //đăng kí ở
  registerContract() {
    this.router.navigate(['category/register-contract']);
  }
  // chấm dứt hợp đồng từ sinh viên
  removeContractStudent(index: any) {
    const params = {
      _id: this.dataOneStudent[0]._id,
      id: this.dataOneStudent[0].id,
      sinhvienid: this.dataOneStudent[0].sinhvienid,
      phongid: this.dataOneStudent[0].phongid,
      ngaybatdau: this.dataOneStudent[0].ngaybatdau,
      ngayketthuc: this.dataOneStudent[0].ngayketthuc,
      tinhtranghopdong: "Chờ chấm dứt"
    }
    //console.log(this.dataOneStudent[0]._id);
    this.contractService.updatecontract(params).subscribe((data) => {
      this.loadData();
    })
  }
  //gia hạn hợp đồng từ sinh viên
  extendContractStudent(index: any) {
    this.router.navigate(['category/extend-contract', index]);
  }
}
