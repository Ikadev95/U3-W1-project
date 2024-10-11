import { Component } from '@angular/core';
import { iCar } from '../../Interfaces/i-car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cars:iCar[] = []
  ngOnInit(){
    fetch('./assets/db 2.json')
    .then((res)=>res.json())
    .then((dati)=>{
      console.log(dati)
      this.cars = dati

    })
    .catch((err)=>{console.log(err)})
  }
}
