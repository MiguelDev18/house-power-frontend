import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.authenticationService.cargarBE().then(
      resp => {
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        //console.log('oops error del servidor-> ',error.error);
      }
    );
  }

}
