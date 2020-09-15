import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:8000/';



  getEmployee(){
    return this.http.get(this.baseURL);
  }

  postEmployee(emp: Employee){
    return this.http.post(this.baseURL, emp);
  }

  editEmployee(emp: Employee){
    console.log(emp._id);
    console.log(emp);
    return this.http.put(this.baseURL + `${emp._id}`, emp);
  }

  deleteEmployee(_id: string){
    return this.http.delete(this.baseURL + `${_id}`);
  }
}
