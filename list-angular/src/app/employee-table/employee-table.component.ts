import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {

  data : any = null;
  remoteData : any;
  result : any;

  constructor(private employeeService : EmployeeService) {}

  page : number = 0;
  totalPages : number = 0;
  size : number = 20;

  ngOnInit() : void {
    this.getEmployees();
  }

  getEmployees() : void {

    this.employeeService.get(this.page,this.size).subscribe(remoteData => {
      this.data = remoteData;
      console.log(this.data);
      this.totalPages = remoteData.page.totalPages;
    })
    

  }

  deleteEmployee(id : number) : void {

    this.employeeService.delete(id).subscribe(remoteData => {
      this.data = remoteData;
      console.log(this.data);
      this.totalPages = remoteData.page.totalPages;
    })
    location.reload();
  }

  addEmployee(firstName : String, lastName : String, birthDate : String, gender : String, hireDate : String) : void {

    let employee = {
      "birthDate" : birthDate,
      "firstName" : firstName,
      "lastName" : lastName,
      "gender" : gender,
      "hireDate" : hireDate,
      
    }

    let response = this.employeeService.post(employee).subscribe(remoteData => {
      this.data = remoteData;
      console.log(this.data);
      this.totalPages = remoteData.page.totalPages;
    })
    
    console.log(response);
  }

  changePage(delta : number) : void {
    if(delta == 1){
      this.page++;
      this.getEmployees();
    }else if(delta == -1){
      this.page--;
      this.getEmployees();
    }else if(delta == 0){
      this.page = 0;
      this.getEmployees();
    }else{
      this.page = this.totalPages - 1;
      this.getEmployees();
    }

  }

  
}
