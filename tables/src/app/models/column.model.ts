export interface Column {
  code: string;
  text: string;
  content?: (row: any) => any;
}
