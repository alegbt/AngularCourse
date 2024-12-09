import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {Router} from "@angular/router";
import {interval} from "rxjs";

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {

  currentStatus= signal<'online' | 'offline' | 'unknown'>('offline') ;

  private destroyRef = inject(DestroyRef);

  //constructor runna quando angular instanzia il compoennt
  constructor() {
    //con effect esce il console.log ogni volta che il signal cambia. altrimenti verrebbe printato solo la 1 volta
    effect(() =>{
      console.log(this.currentStatus())
    })
  }

  //runna 1 volta dopo che il component input sono stati inizializzati
  //logica complessa andrebbe messa qui
  ngOnInit() {
    //this.interval
     const interval = setInterval(() => {
      const rnd = Math.random();
      if(rnd < 0.5){
        this.currentStatus.set('online');
      }else if(rnd < 0.9){
        this.currentStatus.set('offline');
      }else {
        this.currentStatus.set('unknown');
      }
    }, 2000)

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    })
  }


  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
  }

  //for older angular version
  // private interval?: ReturnType<typeof setInterval>;
  // ngOnDestroy() {
  //   clearTimeout(this.interval);
  // }

}
