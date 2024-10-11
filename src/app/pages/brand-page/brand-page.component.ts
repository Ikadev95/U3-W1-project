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
      .then((res) => res.json())
      .then((dati) => {
        console.log(dati);
        this.cars = dati.filter((car:iCar) => car.brand === this.paramsBrand);
        console.log(this.cars);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

