import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit{
  places = signal<Place[] | undefined>(undefined);
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces()
        .subscribe({
          next: (places) => {
            this.places.set(places);
          },
          error: (error) => {
            this.error.set(error.message);
          },
          complete: () => {
            this.isFetching.set(false);
          }
        });
        this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectPlace(place: Place){
    const subscription = this.placesService.addPlaceToUserPlaces(place)
      .subscribe({
        next: (userPlaces) => {
          console.log('Updated user places', userPlaces);
        },
        error: (error) => {
          console.log(error);
          this.error.set(error.message);
        }
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
