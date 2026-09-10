import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

interface DashboardData {
  bcmUnit: string;
  e2eAdonisId: string;
  processName: string;
  bcmClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [MatTableModule, MatButtonModule],

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  displayedColumns: string[] = [
    'bcmUnit',
    'e2eAdonisId',
    'processName',
    'bcmClass',
    'actions',
  ];

  processes: DashboardData[] = [
    {
      bcmUnit: 'CB-UK1',
      e2eAdonisId: '1457/471',
      processName: 'Payment Processing1',
      bcmClass: 'Class 1',
    },
    {
      bcmUnit: 'CB-UK2',
      e2eAdonisId: '1457/472',
      processName: 'Payment Processing2',
      bcmClass: 'Class 3',
    },
    {
      bcmUnit: 'CB-UK3',
      e2eAdonisId: '1457/473',
      processName: 'Payment Processing3',
      bcmClass: 'Class 1',
    },
    {
      bcmUnit: 'CB-UK4',
      e2eAdonisId: '1457/474',
      processName: 'Payment Processing4',
      bcmClass: 'Class 3',
    },
  ];

  goToTask(process: DashboardData): void {
    alert(`Opening task for ${process.processName}`);
  }
}
