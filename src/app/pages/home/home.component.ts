import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iCar } from '../../Interfaces/i-car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cars: iCar[] = [];
  imagesCar: { logoPath: string; brandName: string }[] = [];
  randomCars: iCar[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    fetch('./assets/db 2.json')
      .then((res) => <Promise<iCar[]>> res.json())
      .then((dati: iCar[]) => {

        this.cars = dati;

        for (let i = 0; i < dati.length; i++) {
          const brandLogo = dati[i].brandLogo;
          const brandName = dati[i].brand;

          const logoPath = `/assets/${brandLogo}`;

          if (!this.imagesCar.some(image => image.logoPath === logoPath)) {
            this.imagesCar.push({ logoPath, brandName });
          }
        }


        this.randomCars = this.getRandomCars(this.cars,2)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  navigateToBrandPage(brandName: string) {
    this.router.navigate(['/brand', brandName]);
  }
  getRandomCars(cars: iCar[], items:number){
    if (cars.length < items) {
      return cars;
    }

    let index1:number;
    do {
      index1 = Math.floor(Math.random() * cars.length);
    } while (!cars[index1].available);

    let index2:number;

    do {
      index2 = Math.floor(Math.random() * cars.length);
    } while (index2 === index1 || !cars[index2].available);

    // così le auto in evidenza sono sempre disponibili e non compaiono modelli esauriti

    return [cars[index1], cars[index2]];
  }
}

