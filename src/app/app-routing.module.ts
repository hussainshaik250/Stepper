import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { StepperComponent } from './stepper/stepper.component';
import { PersonalComponent } from './stepper/personal/personal.component';
import { AccountComponent } from './stepper/account/account.component';



const routes: Routes = [
  {path:'',component:StepperComponent},
  {path:"form",component:StepperComponent},

  {path:"dashboard",component:DashboardComponent},
  {path:"personal",component:PersonalComponent},
  {path:"account",component:AccountComponent}
 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
