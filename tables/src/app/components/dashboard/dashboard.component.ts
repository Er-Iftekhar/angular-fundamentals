import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface DashboardData {
  bcmUnit: string;
  e2eAdonisId: string;
  processName: string;
  bcmClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = [
    'bcmUnit',
    'e2eAdonisId',
    'processName',
    'bcmClass',
    'actions',
  ];

  processes: DashboardData[] = [
    {
      bcmUnit: 'GS-OS',
      e2eAdonisId: '1457/478',
      processName: 'E2E Something',
      bcmClass: 'Class 1',
    },
    {
      bcmUnit: 'GS-OS-2',
      e2eAdonisId: '1457/479',
      processName: 'Payment Process',
      bcmClass: 'Class 2',
    },
    {
      bcmUnit: 'CB-UK',
      e2eAdonisId: '1457/480',
      processName: 'Customer Process',
      bcmClass: 'Class 3',
    },
    {
      bcmUnit: 'CB-DE',
      e2eAdonisId: '1457/481',
      processName: 'Risk Management',
      bcmClass: 'Class 2',
    },
    {
      bcmUnit: 'CB-FR',
      e2eAdonisId: '1457/482',
      processName: 'Finance Process',
      bcmClass: 'Class 1',
    },
    {
      bcmUnit: 'CB-IT',
      e2eAdonisId: '1457/483',
      processName: 'Compliance Process',
      bcmClass: 'Class 2',
    },
    {
      bcmUnit: 'CB-ES',
      e2eAdonisId: '1457/484',
      processName: 'Reporting Process',
      bcmClass: 'Class 3',
    },
    {
      bcmUnit: 'CB-PL',
      e2eAdonisId: '1457/485',
      processName: 'Operations Process',
      bcmClass: 'Class 1',
    },
  ];

  pageSizeOptions: number[] = [5, 10, 25, 50];

  dataSource = new MatTableDataSource<DashboardData>(this.processes);

  goToTask(process: DashboardData): void {
    alert(`Opening task for ${process.processName}`);
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;

    const filterValue = input.value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }
}
