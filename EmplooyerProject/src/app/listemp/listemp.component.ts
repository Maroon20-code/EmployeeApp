import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-listemp',
  templateUrl: './listemp.component.html',
  styleUrls: ['./listemp.component.css']
})
export class ListempComponent implements OnInit {
  ListEmp:  Employee[];
  $:any;
  
  constructor(private serviceEmp : EmployeeService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.reloadData();
    
  }
  reloadData(){
    this.serviceEmp.ListEmp().subscribe((res) => {
      this.ListEmp = res  as Employee[];
      console.log(this.ListEmp);
    }, error => {
      console.log(error);
    });
  }
  deleteSuccess() {
    this.toastr.error( 'Employee removed successfully!');
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
