import { Component, NgModule } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {

  data : any = null;
  remoteData : any;
  result : any;

  employee = {
    birthDate : String,
    firstName : String,
    gender : String,
    hireDate : String,
    lastName : String
  };

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
/*
  //addEmployee(birthDate : String,firstName : String,gender : String, hireDate : String, id: number,lastName : String) : void {
    addEmployee(employee: any):void {

    //const employee = `{"birthDate": "`+birthDate+`","firstName": "`+firstName+`","gender": "`+gender+`","hireDate": "`+hireDate+`","id":"`+id+`","lastName":"`+lastName+`",}`;
    //const employee = JSON.stringify()
    let response = this.employeeService.post(employee).subscribe(remoteData => {
      this.data = remoteData;
      console.log(this.data);
      this.totalPages = remoteData.page.totalPages;
    })
    
    console.log(response);
    location.reload;
  }
*/

  addEmployee(form : NgForm) : void {
    console.log(JSON.stringify(form.value));
    this.employeeService.post(JSON.stringify(form.value)).subscribe(remoteData => {
      this.data = remoteData;
      console.log(this.data);
      this.totalPages = remoteData.page.totalPages;
    })

    location.reload;

    form.resetForm();
  }

  modifyEmployee(item : any) : void {
    let id = item.id;
    console.log(id);
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
