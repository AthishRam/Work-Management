import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../model/itask';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
  task:any=[]
  combined:any=[];
  selectedId:any;
  taskForm!:FormGroup;
  tasks : ITask [] = [];
  inprogress : ITask[] =[];
  done : any[]=[];
  updateIndex!:any;
  editEnabled: boolean = false; 
  
  constructor(private fb :FormBuilder, private route:ActivatedRoute, private router: Router, private http:HttpClient) {}

  ngOnInit(): void{
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.selectedId = params.get('id')
    });
    this.declareTask() 
    if(this.selectedId=='employee'){
     let managerEmail=sessionStorage.getItem('managerEmail');
     let employeeEmail=sessionStorage.getItem('employeeEmail');
     this.http.get("http://localhost:8085/manager/employee/"+ employeeEmail+"/"+managerEmail).subscribe(res=>{
     let employeeTask = JSON.stringify(res)
     this.task= JSON.parse(employeeTask)
    })
    }
    this.taskForm = this.fb.group({
      item:['',Validators.required]
    })
  }

  deleteTask(i: number){
   this.tasks.splice(i,1)
  }
  
  deleteInProgress(i:number){
    this.inprogress.splice(i,1)
  }
  deleteDone(i:number){
    this.done.splice(i,1)
  }
  updateTask(item:ITask, i:number){
    this.taskForm.controls['item'].setValue(item.description);
    this.updateIndex  = i;
    this.editEnabled = true;
  }

  editTask(){
   this.tasks[this.updateIndex].description = this.taskForm.value.item;
   this.tasks[this.updateIndex].done=false;    
   this.taskForm.reset();
   this.updateIndex=undefined;
   this.editEnabled=false;
  }

  addTask(){
    this.tasks.push({
      description:this.taskForm.value.item,
      done:false
  })
  this.taskForm.reset();
  }
  
  declareTask(){
    if(this.selectedId=='manager'){
      let assign:any = sessionStorage.getItem('employeeobj');
      this.task = JSON.parse(assign)
      for(let i=0;i<this.task.task.length;i++){    
      this.tasks[i]={description:this.task.task[i]?.todo, done:false}
      this.inprogress[i]={description:this.task.task[i]?.inprogress, done:false}
      this.done[i]={description:this.task.task[i]?.done}
    }
  }}

  assignTask(){
    this.tasks=this.tasks.filter(element => element.description != null)
    this.inprogress=this.inprogress.filter(element => element.description != null)
    this.done=this.done.filter(element => element.description != null)
    let index=Math.max(this.done.length, this.inprogress.length, this.tasks.length)
    for(let i=0;i<index;i++){
      //if(this.tasks[i]?.description!=null || this.inprogress[i]?.description!=null || this.done[i]?.description!=null){
      let combined = {todo:this.tasks[i]?.description, inprogress:this.inprogress[i]?.description, done:this.done[i]?.description}
      this.combined[i]=combined
    }
    let assign:any = sessionStorage.getItem('employeeobj');
    let task = JSON.parse(assign)
    task.task = this.combined
    let managerid = sessionStorage.getItem('managerid')
    this.http.put<any>("http://localhost:8085/employee/task/"+managerid+"/"+task.email, task).subscribe(()=>
    this.router.navigate(['employees'])
  )
//alert("Task is assigned");
}
  
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}