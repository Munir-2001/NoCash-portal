// import { Component, OnInit } from '@angular/core';
// import { EmployeeserviceService } from '../services/employeeservice.service';
// @Component({
//   selector: 'app-tab1',
//   templateUrl: 'tab1.page.html',
//   styleUrls: ['tab1.page.scss']
// })
// export class Tab1Page implements OnInit {

//   public items:any;
//   constructor(public EmployeeService:EmployeeserviceService) {}
//   AddEmployeeAPI(){
//     this.EmployeeService.AddEmployee();
//   }
//   ngOnInit() {
//     this.GetEmployeesAPI();
//   }
//   GetEmployeesAPI(){
//     this.items =this.EmployeeService.GetEmployees();
//     console.log("Next line was items check")
//     console.log(this.items);
//     console.log("Prev line was items check")
//   }
//   DeleteEmployeeAPI(){
//     this.EmployeeService.DeleteEmployee();
//   }
// }


import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService } from '../services/employeeservice.service';
import { EmployeeModel } from '../models/employeemodel';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public items: EmployeeModel[] = [];

  constructor(public employeeService: EmployeeserviceService) {

  }

  ngOnInit() {
    this.GetEmployeesAPI();
  }

  AddEmployeeAPI() {
    this.employeeService.AddEmployee();
  }

  GetEmployeesAPI() {
    this.employeeService.GetEmployees().then(() => {
      this.items = this.employeeService.employeedetails;
      console.log("Next line was items check");
      console.log(this.items);
      console.log("Prev line was items check");
    });
  }

  DeleteEmployeeAPI() {
    this.employeeService.DeleteEmployee();
  }
}
