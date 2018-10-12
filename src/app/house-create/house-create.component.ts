import { House } from './../houses/house.model';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2'
import { HousesService } from './../houses/houses.service';
import { User } from '../users/user.model';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.css']
})
export class HouseCreateComponent implements OnInit {

  house: House;
  private user: User;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private housesService: HousesService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loadHouse();
  }
  //cargar los hogares desde 
  
  loadHouse(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']; //obtener id del hogar desde la peticion get
      if(id){
        this.housesService.getHouse(id).subscribe( house => this.house = house);
      }else{
        //si no hay id en la peticion http crear nuevo hogar 
        this.house = new House();
        
        //si es admin
        if(sessionStorage.getItem('user') && this.authenticationService.isAdmin()){
          this.user = JSON.parse(sessionStorage.getItem('user'));
        }else{
          //si es user recuperar datos del usuario logeado 
          this.user = new User();
          this.user.username = JSON.parse(localStorage.getItem('currentUser')).username;
          console.log("username", this.user.username);
          //this.user = new User();
        }
        this.house.usuario = this.user;
        console.log(this.house);
        
      }
    });
  }

  saveHouse(): void{
    this.housesService.saveHouse(this.house).subscribe(
      response => {
        //cargar pagina de hogares
        this.router.navigate(['/houses']);
        //desplegar mensaje de exito
        swal(
          'Hogar Guardado!',
          response.message,
          'success'
        );
      }
    );
  }

}
