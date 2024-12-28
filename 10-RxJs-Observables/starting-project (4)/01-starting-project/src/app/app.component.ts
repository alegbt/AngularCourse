import {assertInInjectionContext, Component, computed, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {interval, map, Observable} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


  // OBSERVABLES : values over time, emesse continuamente in uno stream, devi fare la subscribe x avere il prossimo
  // emit, adatte x operazioni async, dove le value possono cambiare nel tempo

  //SIGNALS : value container, puoi "leggere" la value, adatte x manage dello stato

  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); //trasformo signal in observable

  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0}); //trasformo observable in signal //initialValue serve x mettere 1 value iniziare ad 1 observable


  //custom observable
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      if(timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return
      }
      console.log('emitting new value')
      subscriber.next({message: 'new value'})},2000)
      timesExecuted++
  }); //la funzione viene eseguita quando avviene 1 subscribe all'observable

  private destroyRef = inject(DestroyRef)

  constructor() {
    //logging con signal
    // effect(() => {   //When a signal accessed inside an effect changes, the effect function automatically re-runs.
    //   console.log(`clicked ${this.clickCount()}`)
    // })

    //loggin con observables
    const sub = this.clickCount$.subscribe({
      next: (val) => console.log(`clicked ${this.clickCount()}`)
    })
    this.destroyRef.onDestroy(()=>{
      sub.unsubscribe();
    })

  }

  //INTERVAL - con signal : i signal devono avere una starting value, gli observables no
  // interval = signal(0)
  // doubleInterval = computed(() => this.interval()*2)

  ngOnInit(): void {

    //INTERVAL - con signal : starta sempre e non si l;eva la subscription
    // setInterval(() => {
    //   this.interval.update(prevIntervalNumber => prevIntervalNumber + 1);
    //   }, 1000);

    //INTERVAL - con observables : starta solo se qualcuno e' subscribed e puo essere unsubscribed
    // const subscription = interval(1000).pipe( //.pipe serve x chainare operazioni sulle value rritornato e .map fa quello che fa map su js
    //   map((val) => val * 2)
    // ).subscribe({
    //   next: (val) => console.log(val)
    // });
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // })

    //setto un azione per l'observable customInterval$ ed in base a cosa accade (next= ogni ciclo, complete=quando facio return ed esco, error= se c'e 1 errore)
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('completeD'),
      error: err => console.log(err),
    })

    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times.`),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }


  onClick(){
    this.clickCount.update(prev => prev+1)
  }
}
