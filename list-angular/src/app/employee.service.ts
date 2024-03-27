import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient : HttpClient) { }

  get(page: number, size: number): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/employees?page="+page+"&size="+size+"");
  }
}
