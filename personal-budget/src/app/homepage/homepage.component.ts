import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto'
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements AfterViewInit {

  // public dataSource = {
  //   datasets: [
  //     {
  //       data: [30, 350, 90],
  //       backgroundColor: [
  //         '#ffcd56',
  //         '#ff6384',
  //         '#36a2eb',
  //         '#fd6b19',
  //       ]
  //     }
  //   ],
  //   labels: [
  //     'Eat out',
  //     'Rent',
  //     'Groceries'
  //   ]
  // };

  dataSource: any = { datasets: [{ data: [] }], labels: [] };

  constructor(private dataService: DataService) {}

  // employs Data Service:
  ngAfterViewInit(): void {
    this.dataService.fetchBudget().subscribe(
      res => {
        console.log(res);
        for (let i = 0; i < res.budget_items.length; i++) {
          this.dataSource.datasets[0].data[i] = res.budget_items[i].cost;
          this.dataSource.labels[i] = res.budget_items[i].item;
        }
        this.createChart();
      },
      err => {
        console.error(err);
      }
    );
  }

  // the old, non Data Service method:
  // ngAfterViewInit(): void {
  //   this.http.get('http://localhost:3000/budget')
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       for (var i = 0; i < res.budget_items.length; i++) {
  //         this.dataSource.datasets[0].data[i] = res.budget_items[i].cost;
  //         this.dataSource.labels[i] = res.budget_items[i].item;
  //       }
  //       this.createChart();
  //     })
  // }


  createChart() {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
    });
  }
}
