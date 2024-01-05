import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees:any=[]; 
  public searchTerm:string='';
 
  constructor(private router: Router, private http: HttpClient) {}
  
  ngOnInit(): void {
    let managerid:any = sessionStorage.getItem('managerid');
    this.http.get<any>("http://localhost:8085/manager/"+managerid).subscribe(res=>{
    let managerobj:any = res
    let managerstr:any=JSON.stringify(managerobj)
    this.employees=JSON.parse(managerstr)
    sessionStorage.setItem('managerid',this.employees.email)
   })
  } 
  navigateTask(employee:any){
    sessionStorage.setItem('employeeobj', JSON.stringify(employee));
    this.router.navigate(['task',{id:"manager"}])
  }
 search(event:any){
   this.searchTerm = (event.target as HTMLInputElement).value;
  }
  }