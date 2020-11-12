import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  employee:Employee = new Employee();
  employ:NgForm;
  ListEmp: Employee[]=[];
  submitted = false;
  selectedValue ="City";
  selectedValue2 ="City";
  employeeCity="";
  p: number = 1;
  Id:number;
  exist:boolean=false;
  @ViewChild('f') myForm;
  
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
    }, error => console.log(error));  
  }
  SubmitEmp(employ) {
    this.serviceEmp.updateEmployee(employ)
    .subscribe(data => {console.log(data), error => console.log(error)}
    );
    this.reloadData();  
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
    this.employee.city=this.selectedValue;
    
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
