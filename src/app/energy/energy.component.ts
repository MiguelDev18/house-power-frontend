import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Chart } from 'chart.js';

import { EnergyService } from './energy.service';
import { Energy } from './energy.model';

@Component({
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.css']
})
export class EnergyComponent implements OnInit {

  LineChart=[];
  //myChart=[];
  //ctx = document.getElementById("myChart");
  private energyData: Array<Energy>;
  dataEnergiaDia=[];
  dataDia=[];

  constructor(
      private activatedRoute: ActivatedRoute,
      private energyService: EnergyService
    ) { }

  ngOnInit() {
      this.loadEnergy();
      /*
      this.dataDia = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
      console.log(this.dataEnergiaDia)
      this.dataEnergiaDia = [12, 19, 3, 5, 2, 3];
      this.loadChart();*/

    
   // this.loadEnergy();
  }
  loadChart(): void{
    this.LineChart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: this.dataDia,//["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: 'WattsHora (Wh)',
            data: this.dataEnergiaDia,//[12, 19, 3, 5, 2, 3],
            fill:false,
            lineTension:0.2,
            borderColor:"red",
            borderWidth: 1
          }]
        },
        options: {
          title:{
            text:"Line Chart",
            display:true
          },
          scales:{
            yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
          }
        }
      });
  }

  loadEnergy(): void{
    this.activatedRoute.params.subscribe(params => {
        let idHouse = params['idHouse'];
        if(idHouse){
            this.energyService.getEnergyData(idHouse).subscribe(energyData => {
                console.log(energyData);
                this.energyData = energyData;
                this.dataEnergiaDia = this.energyData.map(data => data.energiaDia);
                console.log(this.dataEnergiaDia);
                this.dataDia = this.energyData.map(data => data.dia);
                console.log(this.dataDia);
                this.loadChart();
            });
            console.log(this.dataEnergiaDia);
            console.log(this.dataDia);
            console.log(this.energyData);
        }
    });
  }

}
