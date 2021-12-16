import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ReportListComponent } from './disciplinary-report/report-list/report-list.component';
import { ReportFormComponent } from './disciplinary-report/report-form/report-form.component';


@NgModule({
  declarations: [
    ReportComponent,
    ReportListComponent,
    ReportFormComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
