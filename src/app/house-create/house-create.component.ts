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
  private id: number;
  private user: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private housesService: HousesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadHouse();
  }
  
  loadHouse(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        console.log("si id");
        this.housesService.getHouse(id).subscribe( house => this.house = house);
      }else{
        this.house = new House();
        console.log(JSON.parse(sessionStorage.getItem("user")).id);
        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.house.usuario = this.user;
        console.log(this.user);
        
      }
    });
  }

  saveHouse(): void{
    this.housesService.saveHouse(this.house).subscribe(
      response => {
        this.router.navigate(['/houses']);
        swal(
          'Hogar Guardado!',
          response.message,
          'success'
        );
      }
    );
  }

}
