import { Injectable } from '@angular/core';
//inject globale
@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  log(message: string) {
    const timeStamp = new Date().toLocaleTimeString();
    console.log(`[${timeStamp}]: ${message}`);
  }




}
