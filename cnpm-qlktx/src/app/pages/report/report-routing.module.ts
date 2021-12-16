import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportFormComponent } from './disciplinary-report/report-form/report-form.component';
import { ReportListComponent } from './disciplinary-report/report-list/report-list.component';
import { ReportComponent } from './report.component';

const routes: Routes = [
  { path: '', component: ReportListComponent },
  { path: 'report-list', component: ReportListComponent },
  { path: 'report-form/:id', component: ReportFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
