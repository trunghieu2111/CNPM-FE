import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLogin } from 'src/app/services/service-login.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  data: any;
  pageIndex: number = 1;
  pageSize: number = 5;
  total: number = 0;

  flagPer = 1;

  constructor(public studentService: StudentService,
    public loginService: ServiceLogin,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.flagPer = this.loginService.flagPermission
    this.loadData();
  }
  public loadData() {
    this.studentService.getListStudent().subscribe((data) => {
      this.data = data;
      this.total = this.data.length;
    })
  }

  addStudent() {
    this.router.navigate(['category/student-form', 0]);
  }

  removeStudent(index: any) {
    this.studentService.deleteStudent(index).subscribe((data) => {
      this.loadData();
    });
  }

  editStudent(index: any) {
    this.router.navigate(['category/student-form', index]);
  }

  onKey(keyword: any) {
    this.studentService.getListStudent(keyword.target.value).subscribe((data) =>{
      this.data = data;
      this.total = this.data.length;
    })
    //console.log(keyword);
  }

}
