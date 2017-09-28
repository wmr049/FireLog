import { Component, OnInit } from '@angular/core';
import { ManagerSystemService } from 'app/pages/manager/services/manager-system.service';
import { ManagerSystemChartService } from 'app/pages/manager/services/manager-system-chart.service';

@Component({
  selector: 'nga-manager-system',
  styleUrls: ['./manager-system.scss'],
  templateUrl: './manager-system.html',
})

export class ManagerSystemComponent implements OnInit {


  emailParametersUser: any[];
  data: any;

  constructor(private _managerSystemService: ManagerSystemService,
    private _managerSystemChartService: ManagerSystemChartService) {

    this.emailParametersUser = _managerSystemService.emailParametersUser;

  }

  ngOnInit() {
    this.data = this._managerSystemChartService.getAll();
  }

  getResponsive(padding, offset) {
    return this._managerSystemChartService.getResponsive(padding, offset);
  }

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;

  barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Implantações' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Fatal' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Erros' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Avisos' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Informações' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Depurar' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Detalhar' },
  ];

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}
