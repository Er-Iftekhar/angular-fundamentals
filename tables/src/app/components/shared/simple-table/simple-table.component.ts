import {
  AfterViewInit,
  Component,
  computed,
  effect,
  input,
  output,
  ViewChild,
} from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { NgTemplateOutlet } from '@angular/common';
import { Column } from '../../../models/column.model';

@Component({
  selector: 'app-simple-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgTemplateOutlet,
  ],
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
})
export class SimpleTableComponent implements AfterViewInit {
  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  columns = input.required<Column[]>();

  processes = input<any[]>([]);

  rowClicked = output<any>();

  dataSource = new MatTableDataSource<any>();

  displayedColumns = computed(() =>
    this.columns().map((column) => column.code),
  );

  constructor() {
    effect(() => {
      this.dataSource.data = this.processes();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.dataSource.filter = inputElement.value.trim().toLowerCase();

    this.dataSource.paginator?.firstPage();
  }

  onRowClick(row: any): void {
    this.rowClicked.emit(row);
  }
}
