import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //private baseUrl = 'http://localhost:8080/api/v1/employees';
  
   constructor(private http: HttpClient) { }
  addEmployee(Emp:Object): Observable<Object>{
    return this.http.post(environment.baseUrl,Emp);
  }

  ListEmp(){
    return this.http.get(environment.baseUrl);
  }
  DeleteEmp(id){
    return this.http.delete(environment.baseUrl+'/'+id);
  }
  EmpById(id){
    return this.http.get(environment.baseUrl+'/'+id);
  }
  updateEmployee(Emp) {
    return this.http.put(environment.baseUrl+'/'+Emp.id,Emp);
  }
  EmpByCity(city){
    return this.http.get(environment.baseUrl2+'/'+city);
  }

}
