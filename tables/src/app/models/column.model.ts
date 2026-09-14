import { TemplateRef } from '@angular/core';

export interface Column {
  code: string;
  text: string;
  content?: (row: any) => any;
  cellRef?: TemplateRef<any>;
  sortDisabled?: boolean;
}
