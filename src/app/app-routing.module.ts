import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { AppComponent } from './app.component';
import { HousesComponent } from './houses/houses.component';
import { HouseCreateComponent } from './house-create/house-create.component';
import { EnergyComponent } from './energy/energy.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/create_users', component: UsersCreateComponent },
  { path: 'houses', component: HousesComponent },
  { path: 'houses/create_house', component: HouseCreateComponent },
  { path: 'houses/create_house/:id', component: HouseCreateComponent },
  { path: 'houses/energy/:idHouse', component: EnergyComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
