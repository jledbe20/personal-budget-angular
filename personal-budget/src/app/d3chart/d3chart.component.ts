import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3chart',
  templateUrl: './d3chart.component.html',
  styleUrls: ['./d3chart.component.scss']
})

export class D3ChartComponent implements OnInit {
  private data: any[] = [];
  // old sample data:
  // private data = [
  //   { name: 'A', value: 10 },
  //   { name: 'B', value: 20 },
  //   { name: 'C', value: 30 },
  //   { name: 'D', value: 40 },
  // ];
  private svg: any;

  // width/height and margin is for bar chart:
  // private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  // private width = 500 - this.margin.left - this.margin.right;
  // private height = 400 - this.margin.top - this.margin.bottom;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // fetch the budget data via the data service
    this.dataService.fetchBudget().subscribe(res => {
      this.data = res.budget_items;

      this.initPieChart();
    });
  }

  initPieChart(): void {
    const width = 500;  // Set desired width
    const height = 500; // Set desired height
    const radius = Math.min(width, height) / 2;

    this.svg = d3.select("#d3chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);  // centering the pie in the middle of width and height

    const color = d3.scaleOrdinal(d3.schemeCategory10); // default color scheme

    const pie = d3.pie<any>().value((d: any) => d.cost);
    const path = d3.arc<any>().outerRadius(radius).innerRadius(0); // innerRadius 0 for pie, >0 would make it a donut.

    const arcs = this.svg.selectAll(".arc")
      .data(pie(this.data))
      .enter().append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", path)
      .attr("fill", (d: any) => color(d.data.item));

    arcs.append("text")
      .attr("transform", (d: any) => `translate(${path.centroid(d)})`) // place the label in the center of the pie slice
      .attr("dy", "0.35em")
      .text((d: any) => d.data.item); // using item as label
  }
}

// initBarChart(): void {
//   this.svg = d3.select("#d3chart")
//     .append("svg")
//     .attr("width", this.width + this.margin.left + this.margin.right)
//     .attr("height", this.height + this.margin.top + this.margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

//   const x = d3.scaleBand()
//     .domain(this.data.map(d => d.name))
//     .range([0, this.width])
//     .padding(0.1);

//   this.svg.append("g")
//     .attr("transform", `translate(0, ${this.height})`)
//     .call(d3.axisBottom(x));

//   const y = d3.scaleLinear()
//     .domain([0, d3.max(this.data, d => d.value)!])
//     .range([this.height, 0]);

//   this.svg.append("g")
//     .call(d3.axisLeft(y));

//   this.svg.selectAll("rect")
//     .data(this.data)
//     .enter().append("rect")
//     .attr("x", (d: any) => x(d.name)!)
//     .attr("y", (d: any) => y(d.value))
//     .attr("width", x.bandwidth())
//     .attr("height", (d: any) => this.height - y(d.value))
//     .attr("fill", "blue");
// }
