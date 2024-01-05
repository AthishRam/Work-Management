import { HomeComponent } from './home/home.component';
import { EmploginComponent } from './login/emplogin/emplogin.component';
import { EmployeeComponent } from './employee/employee.component';
import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManloginComponent } from './login/manlogin/manlogin.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch: 'full'},
  {path:'task',component:TaskComponent},
  {path:'employees', component:EmployeeComponent},
  {path:'employee/login', component:EmploginComponent},
  {path:'manager/login', component:ManloginComponent},
  {path:'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }