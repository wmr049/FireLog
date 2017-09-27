import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {
    const pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'SGA',
        stats: '57,820',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Sala Virtual',
        stats: '$ 89,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'SEAVI',
        stats: '178,391',
        icon: 'face',
      }, {
        color: pieColor,
        description: 'Portal do Aluno',
        stats: '32,592',
        icon: 'refresh',
      }, {
        color: pieColor,
        description: 'Extrato Bcash',
        stats: '32,592',
        icon: 'refresh',
      },
    ];
  }
}
