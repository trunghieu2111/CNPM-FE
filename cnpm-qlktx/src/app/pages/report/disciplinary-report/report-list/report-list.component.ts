import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLogin } from 'src/app/services/service-login.service';
import { recordService } from '../report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total: number = 0;

  flagPer = 1;

  constructor(public recordService: recordService,
    public loginService: ServiceLogin,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.flagPer = this.loginService.flagPermission
    this.loadData();
  }
  public loadData() {
    this.recordService.getListrecord().subscribe((data) => {
      this.data = data;
      this.total = this.data.length;
    })
  }

  addRecord() {
    this.router.navigate(['report/report-form', 0]);
  }

  removeRecord(index: any) {
    this.recordService.deleterecord(index).subscribe((data) => {
      this.loadData();
    });
  }

  editRecord(index: any) {
    this.router.navigate(['report/report-form', index]);
  }

  onKey(keyword: any) {
    this.recordService.getListrecord(keyword.target.value).subscribe((data) =>{
      this.data = data;
      this.total = this.data.length;
    })
    //console.log(keyword);
  }

}
