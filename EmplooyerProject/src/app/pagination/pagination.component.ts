import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../models/Employee';
import { SelectModel } from '../models/SelectModel';
import { EmployeeService } from '../services/employee.service';
var $:any;
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  ListCity:string[]=["Bizerte","Tunis","Arianna"];
  emp:Employee = new Employee();
  ListEmp: Employee[]=[];
  submitted = false;
  selectedValue ="City";
  constructor(private serviceEmp : EmployeeService,private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {

  }
  showSuccess() {
    this.toastr.success( 'Employee added successfully!');
  }


  newEmployee(): void {
    this.submitted = false;
    this.emp = new Employee();
    
  }
  reloadData(){
    this.serviceEmp.ListEmp().subscribe((res) => {
      this.ListEmp = res  as Employee[];
      console.log(this.ListEmp);
    }, error => {
      console.log(error);
    });
  }

  save() {
    this.emp.city=this.selectedValue;
    this.serviceEmp.addEmployee(this.emp)
      .subscribe(data => {console.log(data);  
        this.reloadData();  
    }
      , error => console.log(error));
    //this.employee = new Employee();
    this.newEmployee();
    
    
  }
  selectChangeHandler(event:any){
    this.selectedValue = event.target.value;
    //this.emp.city=this.selectedValue;
    
  }

  onSubmit() {    
    this.submitted = true;
    this.save();  
    this.showSuccess();
  }



}
