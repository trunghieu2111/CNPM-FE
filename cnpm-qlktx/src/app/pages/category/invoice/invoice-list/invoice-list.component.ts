import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLogin } from 'src/app/services/service-login.service';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total: number = 0;

  flagPer = "";

  constructor(public invoiceService: InvoiceService,
    public loginService: ServiceLogin,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.flagPer = this.loginService.flagPermission;
    this.loadData();
  }
  public loadData() {
    this.invoiceService.getListbill().subscribe((data) => {
      this.data = data;
      this.total = this.data.length;
    })
  }

  addInvoice() {
    this.router.navigate(['category/invoice-form', 0]);
  }

  removeInvoice(index: any) {
    this.invoiceService.deletebill(index).subscribe((data) => {
      this.loadData();
    });
  }

  editInvoice(index: any) {
    this.router.navigate(['category/invoice-form', index]);
  }

  onKey(keyword: any) {
    this.invoiceService.getListbill(keyword.target.value).subscribe((data) =>{
      this.data = data;
      this.total = this.data.length;
    })
    //console.log(keyword);
  }

  showInvoice(index: any){
    this.router.navigate(['category/invoice-form-show', index]);
  }

}
