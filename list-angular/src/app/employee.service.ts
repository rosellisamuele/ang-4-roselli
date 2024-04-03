import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  
  delete(id : number) : Observable<any> {
    return this.httpClient.delete("http://localhost:8080/employees/"+id+"");
  }   

  post(body : any) : Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.httpClient.post("http://localhost:8080/employees",body,httpOptions);
  }


}
