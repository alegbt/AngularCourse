import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent {

  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';

  //constructor runna quando angular instanzia il compoennt
  constructor() {}

  //runna 1 volta dopo che il component input sono stati inizializzati
  //logica complessa andrebbe messa qui
  ngOnInit() {
    setInterval(() => {
      const rnd = Math.random();
      if(rnd < 0.5){
        this.currentStatus = 'online';
      }else if(rnd < 0.9){
        this.currentStatus = 'offline';
      }else {
        this.currentStatus = 'unknown';
      }
    }, 2000)
  }



}
