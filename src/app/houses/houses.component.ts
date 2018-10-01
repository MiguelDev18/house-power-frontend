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

  houses: Array<House>
  private user: User;
  constructor(private housesService: HousesService) {}

  ngOnInit() {
    if(sessionStorage.getItem("user")){
      this.user = JSON.parse(sessionStorage.getItem("user"));
      console.log(JSON.parse(sessionStorage.getItem("user")));
    }else{
      this.user = new User();
      console.log("usuario nuevo: " + this.user);
    }
    this.getHouses();
  }

  getHouses(): void{
    this.housesService.getHouses(this.user.username).subscribe(resp => {
      console.log(resp);
      this.houses = resp;
    });
    console.log(this.houses);
  }

  deleteHouse(house: House): void{
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
        this.housesService.deleteHouse(house.id).subscribe(
          response => {
            this.getHouses();
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
