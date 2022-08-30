import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VistaComponent } from '../vista/vista.component';
import { PorfolioDataComponent } from '../component/porfolio-data/porfolio-data.component';
const routes:Routes=[
{path:"inicio", component:VistaComponent},
{path:"",redirectTo:'/inicio',pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class RoutingAppModule { }
