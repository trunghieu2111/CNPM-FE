import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AssetListComponent } from './asset/asset-list/asset-list.component';
import { AssetFormComponent } from './asset/asset-form/asset-form.component';
import { ContractListComponent } from './contract/contract-list/contract-list.component';
import { ContractFormComponent } from './contract/contract-form/contract-form.component';
import { InvoiceFormComponent } from './invoice/invoice-form/invoice-form.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { RoomFormComponent } from './room/room-form/room-form.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentFormComponent } from './student/student-form/student-form.component';

import { AntDesignModule } from 'src/app/share/ant-design.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceFormShowComponent } from './invoice/invoice-form-show/invoice-form-show.component';
import { ShowAssetInRoomComponent } from './asset/show-asset-in-room/show-asset-in-room.component';


@NgModule({
  declarations: [
    CategoryComponent,
    AssetListComponent,
    AssetFormComponent,
    ContractListComponent,
    ContractFormComponent,
    InvoiceFormComponent,
    InvoiceListComponent,
    RoomListComponent,
    RoomFormComponent,
    StudentListComponent,
    StudentFormComponent,
    InvoiceFormShowComponent,
    ShowAssetInRoomComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
