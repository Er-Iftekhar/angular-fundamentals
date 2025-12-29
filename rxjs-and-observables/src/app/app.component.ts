import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  private destroyRef = inject(DestroyRef);

   clickCount = signal(0);
   clickCount$ = toObservable(this.clickCount);
   interval$ = interval(1000);
   intervalSignal = toSignal(this.interval$, {initialValue: 0});
   customInterval$ = new Observable((subscriber) => {
    let timeExecuted = 0;
    const interval = setInterval(() => {
      if(timeExecuted > 3){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting a new value');
      subscriber.next({message: 'New value emitted'});
      timeExecuted++;
    }, 2000);
   });


  constructor(){
    effect(() => {
      console.log(`Clicked Button ${this.clickCount()} times`)
    });
  }

  ngOnInit(): void {
    // interval(1000)
    // .pipe(
    //   map((val) => val * 2)
    // )
    // .subscribe({
    //   next: (val) => console.log(val)
    // });

    this.clickCount$
        .subscribe({
          next: (val) => {
            console.log(`signal to observable button clicked ${val} times`);
          }
        });

    this.customInterval$
        .subscribe({
          next: (val) => {
            console.log(val);
          },
          complete: () => {
            console.log('Completed!');
          }
        });
  }

  onClick(){
    this.clickCount.update(preCount => preCount + 1);
  }
}
