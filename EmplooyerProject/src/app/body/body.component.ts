import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  ListCity:string[]=["Bizerte","Tunis","Arianna"];
  emp:Employee = new Employee();
  employee:Employee = new Employee();
  ListEmp: Employee[]=[];
  submitted = false;
  selectedValue ="City";
  selectedValue2 ="City";
  employeeCity="";
  p: number = 1;
  Id:number;
  constructor(private serviceEmp : EmployeeService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.reloadData();
    
  }
  showSuccess() {
    this.toastr.success( 'Employee added successfully!');
  }
  deleteSuccess() {
    this.toastr.error( 'Employee removed successfully!');
  }
  editSuccess() {
    this.toastr.warning( 'Employee edited successfully!');
  }

  onKey(event:any){
    this.employeeCity=event.target.value;
    if(this.employeeCity == '') {
      this.reloadData();
    }
    //console.log(this.employeeCity);
    
  }
  SearchEmp(){
    if(this.employeeCity.length == 0) {
      this.reloadData();
    }else if (this.employeeCity != ''){

      this.searchData();

    }
    else {
      this.reloadData();
    }
  }
  searchData(){
    this.serviceEmp.EmpByCity(this.employeeCity).subscribe((res) => {
      this.ListEmp = res  as Employee[];
      console.log(this.ListEmp);
    }, error => {
      console.log(error);
    });
  }

  newEmployee(): void {
    this.submitted = false;
    this.emp = new Employee();
    
  }
  updateEmp(id){
    this.Id=id;
    this.serviceEmp.EmpById(id)
    .subscribe(data => {
      console.log(data)
      this.employee = data as Employee;
    }, error => console.log(error));  
  }
  SubmitEmp() {
    this.serviceEmp.updateEmployee(this.Id, this.employee)
    .subscribe(data => {console.log(data);
    this.reloadData();
  }
    , error => console.log(error));
  this.employee = new Employee();
  this.editSuccess();
    //this.updateEmp(this.Id);    
  }


  save() {
    this.emp.city=this.selectedValue;
    this.serviceEmp.addEmployee(this.emp)
      .subscribe(data => {console.log(data);  
        this.reloadData();
        this.showSuccess();  
    }
      , error => console.log(error));
    //this.employee = new Employee();
    this.newEmployee();
    
    
  }
  selectChangeHandler(event:any){
    this.selectedValue = event.target.value;
    //this.emp.city=this.selectedValue;
    
  }
  selectChangeHandler2(event:any){
    this.selectedValue2 = event.target.value;
    //this.emp.city=this.selectedValue;
    
  }

  onSubmit() {    
    this.submitted = true;
    this.save();  
    
  }


  reloadData(){
    this.serviceEmp.ListEmp().subscribe((res) => {
      this.ListEmp = res  as Employee[];
      console.log(this.ListEmp);
    }, error => {
      console.log(error);
    });
  }


  deleteEmp(id){
    this.serviceEmp.DeleteEmp(id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
        
      },
      error => console.log(error));
      this.deleteSuccess();
  }

}
