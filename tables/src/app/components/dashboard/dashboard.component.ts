import { ChangeDetectionStrategy, Component } from '@angular/core';

interface DashboardData {
  bcmUnit: string;
  e2eAdonisId: string;
  processName: string;
  bcmClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [],

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
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
      bcmClass: 'Class 1',
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
      bcmClass: 'Class 1',
    },
  ];
}
