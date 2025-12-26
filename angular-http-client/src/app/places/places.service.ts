import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Error fetching available places');
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Error fetching user places')
        .pipe(
          tap({
            next: (userPlaces) => {
              this.userPlaces.set(userPlaces);
            }
          })
        );
  }

  addPlaceToUserPlaces(place: Place) {
    const prePlaces = this.userPlaces();
    if(!prePlaces.some((p) => p.id === place.id)){
      this.userPlaces.set([...prePlaces, place]);
    }
    return this.httpClient.put('http://localhost:3000/user-places', {placeId: place.id})
        .pipe(
          catchError((error) => {
            this.userPlaces.set(prePlaces);
            this.errorService.showError('Adding place to user places failed. Please try again later.');
            return throwError(() => new Error('Adding place to user places failed. Please try again later'));
          })
        );
  }

  removeUserPlace(place: Place) {
    const prePlaces = this.userPlaces();
    if(prePlaces.some((p) => p.id === place.id)){
      this.userPlaces.set(prePlaces.filter(p => p.id !== place.id));
    }
    return this.httpClient
      .delete('http://localhost:3000/user-places/'+ place.id)
      .pipe(
        catchError(error => {
          this.userPlaces.set(prePlaces);
          this.errorService.showError('Removing user places failed');
          return throwError(() => new Error('Removing user place failed'));
        })
      )
  }

  private fetchPlaces(url: string, errorMessage: string){
   return this.httpClient.get<{places: Place[]}>(url)
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
