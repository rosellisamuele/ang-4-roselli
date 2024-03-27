import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {

  data : any = null;
  
  constructor(private employeeService : EmployeeService) {}

  page : number = 0;
  size : number = 20;

  ngOnInit() : void {
    this.getEmployee();
  }

  getEmployee() : void {
    this.employeeService.get(this.page,this.size).subscribe(remoteData => {
      this.data = remoteData;
    })
  }

  changePage(delta : number) : void {
    if(delta == 1){
      this.page++;
      this.getEmployee();
    }else{
      this.page--;
      this.getEmployee();
    }

  }

  previousPage() : void {
    this.page = this.page - 1;
    this.getEmployee();
  }

  nextPage() : void {
    this.page = this.page + 1;
    this.getEmployee();
  }
}
