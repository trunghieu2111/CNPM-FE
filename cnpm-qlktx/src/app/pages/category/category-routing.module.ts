import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetFormComponent } from './asset/asset-form/asset-form.component';
import { AssetListComponent } from './asset/asset-list/asset-list.component';
import { CategoryComponent } from './category.component';
import { ContractFormComponent } from './contract/contract-form/contract-form.component';
import { ContractListComponent } from './contract/contract-list/contract-list.component';
import { InvoiceFormShowComponent } from './invoice/invoice-form-show/invoice-form-show.component';
import { InvoiceFormComponent } from './invoice/invoice-form/invoice-form.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { RoomFormComponent } from './room/room-form/room-form.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { StudentFormComponent } from './student/student-form/student-form.component';
import { StudentListComponent } from './student/student-list/student-list.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'asset-list', component: AssetListComponent},
  { path: 'asset-form/:id', component: AssetFormComponent},
  { path: 'contract-list', component:  ContractListComponent},
  { path: 'contract-form/:id', component: ContractFormComponent},
  { path: 'invoice-list', component: InvoiceListComponent},
  { path: 'invoice-form/:id', component: InvoiceFormComponent},
  { path: 'room-list', component: RoomListComponent},
  { path: 'room-form/:id', component: RoomFormComponent},
  { path: 'student-list', component: StudentListComponent},
  { path: 'student-form/:id', component: StudentFormComponent},
  { path: 'invoice-form-show/:id', component: InvoiceFormShowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
