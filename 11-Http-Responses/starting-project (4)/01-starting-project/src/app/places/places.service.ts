import {inject, Injectable, signal} from '@angular/core';

import { Place } from './place.model';
import {catchError, map, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../shared/error.service";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'error fetching avaiable places')
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'error fetching user places')
      .pipe(
        tap({       //tap usato x aggiornare lo stato senza fare subscribe (cosi si puo fare subscribe altrove)
        next: (userPlaces) => this.userPlaces.set(userPlaces)
      })
      )
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces()
    if(!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    }).pipe(
      catchError(error => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('failed to store placee')
        return throwError(() => new Error('failed to store place'))
      })
    )
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if(prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter(p => p.id !== place.id));
    }
    return this.httpClient.delete('http://localhost:3000/user-places/' + place.id)
    .pipe(
        catchError(error => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('failed to remove placee')
          return throwError(() => new Error('failed to remove place'))
        })
    )
  }

  private fetchPlaces(url: string, errorMessage: string){
    return this.httpClient.get<{places: Place[]}>(url)
      .pipe(
        map((resData) => resData.places),
        catchError((err) => {
          console.log(err)
          return throwError(() => new Error(errorMessage))
        })
      )
  }

}
