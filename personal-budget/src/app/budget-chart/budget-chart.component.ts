import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';

@Component({
  selector: 'pb-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss']
})
export class BudgetChartComponent {
  public dataSource = {
    datasets: [
      {
        data: [30, 350, 90],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#cbbc1e',
          '#0c8b1a',
          '#541ecb',
          '#1eb5cb',
          '#ffffff',
          '#000000',
        ]
      }
    ],
    labels: [
      'Eat out',
      'Rent',
      'Groceries'
    ]
  };
  constructor(private http: HttpClient) {
    // console.log('A - constructor');
  }

  ngOnInit(): void {
    // console.log('B - OnInit');
    this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        console.log(res);
        for (var i = 0; i < res.budget_items.length; i++) {
          this.dataSource.datasets[0].data[i] = res.budget_items[i].cost;
          this.dataSource.labels[i] = res.budget_items[i].item;
        }
        this.createChart();
      })
  }

  createChart() {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
    });
  }
}
