import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  ViewChild,
  TemplateRef,
  OnInit,
  signal,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SimpleTableComponent } from '../shared/simple-table/simple-table.component';
import { DashboardData } from '../../models/dashboard-data.model';
import { Column } from '../../models/column.model';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [SimpleTableComponent, MatButtonModule, CounterComponent],

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  columns = signal<Column[]>([]);
  ngOnInit(): void {
    this.columns.set([
      {
        code: 'bcmUnit',
        text: 'BCM Unit',
      },
      {
        code: 'e2eAdonisId',
        text: 'Adonis ID',
      },
      {
        code: 'processName',
        text: 'Process Name',
      },
      {
        code: 'bcmClass',
        text: 'BCM Class',
        content: (row) => `BCM ${row.bcmClass}`,
      },
      {
        code: 'actions',
        text: 'Actions',
        cellRef: this.actionCell,
        sortDisabled: true,
      },
    ]);
  }
  @ViewChild('actionCell', { static: true })
  actionCell!: TemplateRef<any>;

  processes: DashboardData[] = [
    {
      bcmUnit: 'GS-OS',
      e2eAdonisId: '1457/478',
      processName: 'E2E Something',
      bcmClass: 1,
    },
    {
      bcmUnit: 'GS-OS-2',
      e2eAdonisId: '1457/479',
      processName: 'Payment Process',
      bcmClass: 2,
    },
    {
      bcmUnit: 'CB-UK',
      e2eAdonisId: '1457/480',
      processName: 'Customer Process',
      bcmClass: 3,
    },
    {
      bcmUnit: 'CB-DE',
      e2eAdonisId: '1457/481',
      processName: 'Risk Management',
      bcmClass: 2,
    },
    {
      bcmUnit: 'CB-FR',
      e2eAdonisId: '1457/482',
      processName: 'Finance Process',
      bcmClass: 1,
    },
    {
      bcmUnit: 'CB-IT',
      e2eAdonisId: '1457/483',
      processName: 'Compliance Process',
      bcmClass: 2,
    },
    {
      bcmUnit: 'CB-ES',
      e2eAdonisId: '1457/484',
      processName: 'Reporting Process',
      bcmClass: 3,
    },
    {
      bcmUnit: 'CB-PL',
      e2eAdonisId: '1457/485',
      processName: 'Operations Process',
      bcmClass: 1,
    },
  ];

  goToTask(row: DashboardData) {
    console.log('Go to task:', row);
  }

  showDetails(row: DashboardData): void {
    console.log('Show details for: ', row);
  }
}
