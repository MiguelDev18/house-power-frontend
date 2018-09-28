import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { HousesComponent } from './houses/houses.component';

import { UsersService } from './users/users.service';
import { UsersCreateService } from './users-create/users-create.service';
import { HousesService } from './houses/houses.service';
import { HouseCreateComponent } from './house-create/house-create.component';
import { EnergyComponent } from './energy/energy.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    WelcomeComponent,
    UsersCreateComponent,
    HousesComponent,
    HouseCreateComponent,
    EnergyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UsersService, UsersCreateService, HousesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
