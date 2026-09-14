import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { DashboardData } from '../../../models/dashboard-data.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-simple-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './simple-table.component.html',
  styleUrl: './simple-table.component.scss',
})
export class SimpleTableComponent implements AfterViewInit {
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

  pageSizeOptions: number[] = [5, 10, 25, 50];

  dataSource = new MatTableDataSource<DashboardData>();

  @Input()
  set processes(value: DashboardData[]) {
    this.dataSource.data = value;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();

    this.dataSource.paginator?.firstPage();
  }

  goToTask(process: DashboardData): void {
    console.log('Selected process: ', process);
  }
}
