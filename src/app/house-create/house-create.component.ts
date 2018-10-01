import { House } from './../houses/house.model';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2'
import { HousesService } from './../houses/houses.service';
import { User } from '../users/user.model';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.loadHouse();
  }
  //cargar los hogares desde backend
  loadHouse(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']; //obtener id del hogar desde la peticion get
      if(id){
        this.housesService.getHouse(id).subscribe( house => this.house = house);
      }else{
        //si no hay id en la peticion http crear nuevo hogar 
        this.house = new House();
        //recuperar datos de usuario desde el sessionStorage
        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.house.usuario = this.user;
        
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
