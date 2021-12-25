import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLogin } from 'src/app/services/service-login.service';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {

  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total: number = 0;

  flagPer = "";

  constructor(
    public assetService: AssetService,
    public loginService: ServiceLogin,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.flagPer = this.loginService.flagPermission;
    //console.log("data:",this.flagPer);
    this.loadData();
  }
  public loadData() {
    this.assetService.getListasset().subscribe((data) => {
      this.data = data;
      this.total = this.data.length;
    })
  }

  addAsset() {
    this.router.navigate(['category/asset-form', 0]);
  }

  removeAsset(index: any) {
    this.assetService.deleteasset(index).subscribe((data) => {
      this.loadData();
    });
  }

  editAsset(index: any) {
    this.router.navigate(['category/asset-form', index]);
  }

  onKey(keyword: any) {
    this.assetService.getListasset(keyword.target.value).subscribe((data) =>{
      this.data = data;
      this.total = this.data.length;
    })

    //console.log(keyword);
  }

  getSign(){
    this.router.navigate(['category/show-asset-in-room']);
  }

  sendSign(){
    this.router.navigate(['category/show-asset-in-room']);
  }
}
