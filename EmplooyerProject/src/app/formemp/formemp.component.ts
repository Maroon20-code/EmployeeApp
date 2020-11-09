import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { SelectModel } from '../models/SelectModel';
import { EmployeeService } from '../services/employee.service';
var $:any;

@Component({
  selector: 'app-formemp',
  templateUrl: './formemp.component.html',
  styleUrls: ['./formemp.component.css']
})
export class FormempComponent implements OnInit {
  ListCity:string[]=["Bizerte","Tunis","Arianna"];
  emp:Employee = new Employee();
  ListEmp: Employee[]=[];
  submitted = false;
  selectedValue ="City";
  constructor(private serviceEmp : EmployeeService) { }

  ngOnInit(): void {


   
  }
  newEmployee(): void {
    this.submitted = false;
    this.emp = new Employee();
  }
  ListEmployee():void {
    this.serviceEmp.ListEmp().subscribe((res) => {
      this.ListEmp = res  as Employee[];
      console.log(this.ListEmp);
    }, error => {
      console.log(error);
    });
  }

  save() {
    this.serviceEmp.addEmployee(this.emp)
      .subscribe(data => {console.log(data)
      this.ListEmployee();
    }
      , error => console.log(error));
    //this.employee = new Employee();
    this.newEmployee();
    
  }
  selectChangeHandler(event:any){
    this.selectedValue = event.target.value;
    this.emp.city=this.selectedValue;
    
  }

  onSubmit() {    
    this.submitted = true;
    this.save();  
  
  }



}
