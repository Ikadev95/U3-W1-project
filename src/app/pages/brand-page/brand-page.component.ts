import { Component, OnInit } from '@angular/core';
import { iCar } from '../../Interfaces/i-car';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrl: './brand-page.component.scss'
})
export class BrandPageComponent implements OnInit {
  cars: iCar[] = [];
  availableCars: iCar[] = [];
  notAvailableCars: iCar[] = [];
  paramsBrand!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.paramsBrand = params.brandName;
      this.fetchCars();
    });
  }

  fetchCars() {
    fetch('./assets/db 2.json')
      .then((res) => <Promise<iCar[]>> res.json())
      .then((dati: iCar[]) => {

        this.cars = dati.filter((car:iCar) => car.brand === this.paramsBrand);
        this.availableCars = this.cars.filter((car:iCar)=> car.available);
        this.notAvailableCars = this.cars.filter((car:iCar)=> car.available === false);
        this.cars = this.availableCars.concat(this.notAvailableCars);
        //così le auto esaurite compariranno sempre per ultime all'utente
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

