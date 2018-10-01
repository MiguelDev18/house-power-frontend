import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
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
  private energyData: Array<Energy>;
  dataEnergiaDia=[]; //almacena los datos de el eje y
  dataDia=[]; //almacena los datos de el eje x

  constructor(
      private activatedRoute: ActivatedRoute,
      private energyService: EnergyService
    ) { }

  ngOnInit() {
      this.loadEnergy();
      
  }

  //trae los datos desde el backend
  loadEnergy(): void{
    this.activatedRoute.params.subscribe(params => {
        let idHouse = params['idHouse']; //obtener id del hogar desde la peticion get
        if(idHouse){
            this.energyService.getEnergyData(idHouse).subscribe(energyData => {
                //guarda datos recuperados desde el backend
                this.energyData = energyData;
                //guarda los datos recuperados en arreglos
                this.dataEnergiaDia = this.energyData.map(data => data.energiaDia);
                this.dataDia = this.energyData.map(data => data.dia);
                //carga el grafico con los datos recuperados desde el backend
                this.loadChart();
            });
            
        }
    });
  }

  loadChart(): void{
    this.LineChart = new Chart('lineChart', {
        type: 'line',
        data: {
          //datos en el eje x
          labels: this.dataDia,
          datasets: [{
            label: 'WattsHora (Wh)',
            //datos en el eje y
            data: this.dataEnergiaDia,
            fill:false,
            lineTension:0.2,
            borderColor:"red",
            borderWidth: 1
          }]
        },
        options: {
          title:{
            //nombre del grafico
            text:"Consumo de Energía",
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

  

}
