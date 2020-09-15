import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { EmptyExpr } from '@angular/compiler';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  public message = '';
  public i: number;
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployee();
  }

  resetForm(form?: NgForm){
    if (form){
      form.reset();
    }
    this.employeeService.selectedEmployee = {
      _id: '',
      name: '',
      position: '',
      office: '',
      salary: null
    };
  }

  onSubmit(form: NgForm){
      if (form.value._id === ''){
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        console.log(res);
        this.resetForm();
        this.refreshEmployee();
      });
    }
    else{
      this.employeeService.editEmployee(form.value).subscribe((res) => {
        // console.log(res);
        this.resetForm();
        this.refreshEmployee();
      });
    }
  }

  refreshEmployee(){
    this.employeeService.getEmployee().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form?: NgForm){
    if (confirm('Are You Sure..!!') === true){
        this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployee();
        this.resetForm();
      });
    }
  }
}
