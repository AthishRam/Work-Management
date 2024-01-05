import { EnableService } from './../../model/enable.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manlogin',
  templateUrl: './manlogin.component.html',
  styleUrls: ['./manlogin.component.css']
})
export class ManloginComponent implements OnInit {
  
  public invalid:boolean | undefined;
  managerobj:any | undefined;
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
       sessionStorage.setItem('managerid',a.email)
       return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password 
  });
      if(user){
        this.loginForm.reset();
        this.service.enable.next("false")
        this.router.navigate(['employees'])
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