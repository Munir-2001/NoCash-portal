import { Component } from '@angular/core';
import { EmployeeserviceService } from '../services/employeeservice.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public items:any;
  constructor(public EmployeeService:EmployeeserviceService) {}
  AddEmployeeAPI(){
    this.EmployeeService.AddEmployee();
  }
  GetEmployeesAPI(){
    this.items =this.EmployeeService.GetEmployees();
    console.log("Next line was items check")
    console.log(this.items);
    console.log("Prev line was items check")
  }
  DeleteEmployeeAPI(){
    this.EmployeeService.DeleteEmployee();

  }
}
