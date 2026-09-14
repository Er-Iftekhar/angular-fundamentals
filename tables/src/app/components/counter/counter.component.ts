import { Component, signal } from '@angular/core';
import { Column } from '../../models/column.model';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  count = signal(0);
  name = signal('Yasar');

  increase(): void {
    this.count.update((current) => current + 1);
  }

  columns = signal<Column[]>([
    {
      code: 'bcmUnit',
      text: 'BCM Unit',
    },
    {
      code: 'processName',
      text: 'Process Name',
    },
  ]);
}
