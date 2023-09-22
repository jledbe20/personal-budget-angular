import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js/auto'

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
    var canvas = document.getElementById('myChart') as HTMLCanvasElement;

    if (canvas) {
        var ctx = canvas.getContext('2d');

        if (ctx) {
            var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: this.dataSource
            });
        } else {
            console.error('Could not get 2D context for the canvas.');
        }
    } else {
        console.error('Canvas element with ID "myChart" not found.');
    }
  }
}

