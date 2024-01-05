import { Component, OnInit } from '@angular/core';
import { EnableService } from '../model/enable.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public selectedId:any=""; 
  public valid:any="true";
  
  constructor( private service: EnableService){
    this.service.enable.subscribe((data)=>{
      this.valid=data;
      sessionStorage.setItem("enable", this.valid);
      this.valid=sessionStorage.getItem("enable"); 
    })
    if(sessionStorage.getItem("enable")=="false") 
    this.valid=sessionStorage.getItem("enable")
}

ngOnInit(): void{}

disable(){
  this.valid="true";
  sessionStorage.removeItem("enable");
}}