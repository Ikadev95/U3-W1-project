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

  constructor(private router: Router) {}

  ngOnInit() {
    fetch('./assets/db 2.json')
      .then((res) => res.json())
      .then((dati) => {
        console.log(dati);
        this.cars = dati;

        for (let i = 0; i < dati.length; i++) {
          const brandLogo = dati[i].brandLogo;
          const brandName = dati[i].brand;

          const logoPath = `/assets/${brandLogo}`;

          if (!this.imagesCar.some(image => image.logoPath === logoPath)) {
            this.imagesCar.push({ logoPath, brandName });
          }
        }

        console.log(this.imagesCar);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  navigateToBrandPage(brandName: string) {
    this.router.navigate(['/brand', brandName]);
  }
}
