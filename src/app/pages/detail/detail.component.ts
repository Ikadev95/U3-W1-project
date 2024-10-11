import { Component, OnInit } from '@angular/core';
import { iCar } from '../../Interfaces/i-car';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})

  export class DetailComponent implements OnInit {
    car!: iCar;
    paramsModel!: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      this.route.params.subscribe((params: any) => {
        this.paramsModel = params.model;
        this.fetchCar();
      });
    }

    fetchCar() {
      fetch('./assets/db 2.json')
        .then((res) => <Promise<iCar[]>> res.json())
        .then((dati: iCar[]) => {

        let found = dati.find(car => car.model == this.paramsModel)
        if(found){
          this.car = found
        }

        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


