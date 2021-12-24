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

  flagPer = "";

  constructor(public contractService: ContractService,
    public loginService: ServiceLogin,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.flagPer = this.loginService.flagPermission;
    this.loadData();
  }
  public loadData() {
    this.contractService.getListcontract().subscribe((data) => {
      this.data = data;
      this.total = this.data.length;
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
    this.contractService.getListcontract(keyword.target.value).subscribe((data) =>{
      this.data = data;
      this.total = this.data.length;
    })
    //console.log(keyword);
  }

  extendContract(index: any){
    //this.router.navigate(['category/invoice-form-show', index]);
  }
}
