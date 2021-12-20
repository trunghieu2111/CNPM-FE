import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ReportListComponent } from './disciplinary-report/report-list/report-list.component';
import { ReportFormComponent } from './disciplinary-report/report-form/report-form.component';

import { AntDesignModule } from 'src/app/share/ant-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportComponent,
    ReportListComponent,
    ReportFormComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportModule { }
