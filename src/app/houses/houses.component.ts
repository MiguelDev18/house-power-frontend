import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'
import { HousesService } from './../houses/houses.service';

import { User } from '../users/user.model';
import { House } from './house.model';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {

  //arreglo de hogares para cargar en la vista
  houses: Array<House>;
  private user: User;
  constructor(private housesService: HousesService) {}

  ngOnInit() {
    //recuperar datos de usuario desde el sessionStorage
    if(sessionStorage.getItem("user")){
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }else{
      this.user = new User();
    }
    this.getHouses();
  }

  //recuperar lista de hogares desde el servidor
  getHouses(): void{
    this.housesService.getHouses(this.user.username).subscribe(resp => {
      this.houses = resp;
    });
  }

  deleteHouse(house: House): void{
    //desplegar mensaje de confirmacion
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Hogar ubicado en la dirección: ${house.direccion} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value){
        //ejecutar la peticion si se confirma la accion
        this.housesService.deleteHouse(house.id).subscribe(
          response => {
            //cargar nuevamente la lista de hogares
            this.getHouses();
            //mostrar mensaje de exito
            swal(
              'Hogar Eliminado!',
              response.message,
              'success'
            );
          }
        );
      }
    });
  }

}
