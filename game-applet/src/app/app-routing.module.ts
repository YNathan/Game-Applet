import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartingPointComponent } from './starting-point/starting-point.component';

const routes: Routes = [

  {
    path: '',

    component: StartingPointComponent


  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
