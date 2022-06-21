import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  salesData: ChartData<'bar'> = {
    labels: ['Development', 'Testing', 'Facility', 'Security', 'Management'],
    datasets: [
      { label: 'Rolestar', data: [10, 12, 10, 20, 50] },
      { label: 'Tech Thunder', data: [20, 10, 40, 50, 90] },
      { label: 'Gladiator', data: [50, 40, 35, 45, 50] },
      { label: 'First victor', data: [10, 50, 10, 60, 90] },
    ],
  };
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };
  
}
