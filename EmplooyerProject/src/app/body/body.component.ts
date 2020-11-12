import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  exist:boolean=false;
  
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
    this.toastr.info( 'Employee edited successfully!');
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
    }
    else if (this.employeeCity != ''){

      this.searchData();

    }
    else {
      this.reloadData();
    }
  }
  searchData(){
    for (let i=0;i<this.ListEmp.length;i++){
      if(this.employeeCity == this.ListEmp[i].city) {
        this.exist = true;
        break;
      }
    }

    if(this.exist){
      this.serviceEmp.EmpByCity(this.employeeCity).subscribe((res) => {
        this.ListEmp = res  as Employee[];
        console.log(this.ListEmp);
      }, error => {
        console.log(error);
      });
    } 
    else {
      $("#search").val("");
      this.reloadData();
    }

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
      //$("#City").val(this.employee.city.toString()).change();
    }, error => console.log(error));  
  }

  SubmitEmp() {

    //console.log( this.employee);
    this.serviceEmp.updateEmployee(this.employee)
    .subscribe(data => {console.log(data) , error => console.log(error)
  });
  this.employee = new Employee();
  this.editSuccess();
  this.reloadData();
    //this.updateEmp(this.Id);
    //console.log( this.employee);
    //console.log(empl.form.value);
  }


  save(emp:NgForm) {
    //this.emp.city=this.selectedValue;
    this.serviceEmp.addEmployee(this.emp)
      .subscribe(data => {console.log(data);  
        this.reloadData();
        this.newEmployee();
        this.showSuccess(); 
        this.submitted = true;
    }
      , error => console.log(error));
      emp.resetForm(); 
    //this.employee = new Employee();
       
  }

  selectChangeHandler(event:any){
    this.selectedValue = event.target.value;
    this.selectedValue =this.selectedValue.substring(3);
    console.log(this.selectedValue);
    //this.emp.city=this.selectedValue;
    
  }
  selectChangeHandler2(event:any){
    this.selectedValue2 = event.target.value;
    this.selectedValue2 =this.selectedValue2.substring(3);
    //this.employee.city=this.selectedValue;
    
  }

  /*onSubmit() {    
    this.submitted = true;
    this.save();  
    
    
  }*/


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
