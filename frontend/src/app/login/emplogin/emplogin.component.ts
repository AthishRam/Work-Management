import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnableService } from 'src/app/model/enable.service';

@Component({
  selector: 'app-emplogin',
  templateUrl: './emplogin.component.html',
  styleUrls: ['./emplogin.component.css']
})
export class EmploginComponent implements OnInit{

  public invalid:boolean | undefined;
  public valid:boolean | undefined;
  employeeobj:any | undefined;
  employeesarr=[];
  url='http://localhost:8085/manager'
  public loginForm!: FormGroup

  constructor(private fb:FormBuilder, private http: HttpClient,private router: Router, private service: EnableService) { }

  ngOnInit(): void {
     this.loginForm=this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    });
  }
  login(){
    this.http.get<any>(this.url).subscribe(res=>{
        const user = res.find((a:any)=>{
        for(let i = 0; i<a.employees.length; i++){             
        let employees=JSON.stringify(a.employees[i])
        this.employeeobj =JSON.parse(employees)
        if(this.employeeobj.username === this.loginForm.value.username && this.employeeobj.password === this.loginForm.value.password){
          this.valid=true;
          sessionStorage.setItem('employeeEmail', this.employeeobj.email);
          sessionStorage.setItem('managerEmail', a.email);
          break;
        }
        else
        this.valid=false;
      }
      return this.valid 
  });
      if(user){
        this.loginForm.reset();
        this.service.enable.next("false")
        this.router.navigate(['task',{id:"employee"}])
      }
      else if(this.loginForm.valid){
     this.invalid = true;
      }
    })}

    get username(){
      return this.loginForm.controls['username'];
    }
    get password(){
      return this.loginForm.controls['password'];
    }
}