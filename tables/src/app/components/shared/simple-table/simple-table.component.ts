import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Column } from '../../../models/column.model';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-simple-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgTemplateOutlet,
  ],
  templateUrl: './simple-table.component.html',
  styleUrl: './simple-table.component.scss',
})
export class SimpleTableComponent implements AfterViewInit {
  @Input()
  columns: Column[] = [];

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  get displayedColumns(): string[] {
    return this.columns.map((column) => column.code);
  }

  pageSizeOptions: number[] = [5, 10, 25, 50];

  dataSource = new MatTableDataSource<any>();

  @Input()
  set processes(value: any[]) {
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
}
