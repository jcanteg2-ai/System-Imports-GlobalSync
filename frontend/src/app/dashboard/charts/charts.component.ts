import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  standalone: true,
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit {

  @ViewChild('salesChart') salesChart!: ElementRef;
  @ViewChild('categoryChart') categoryChart!: ElementRef;

  ngAfterViewInit() {
    this.createSalesChart();
    this.createCategoryChart();
  }

  createSalesChart() {
    new Chart(this.salesChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep' ],
        datasets: [{
          label: 'Ingresos (millones)',
          data: [5, 7, 9, 6, 10, 13],
          borderColor: '#3A86FF',
          backgroundColor: 'rgba(58,134,255,0.2)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        plugins: { legend: { display: true, position: 'bottom' } },
        scales: {
          y: { beginAtZero: true },
          x: { grid: { display: false } }
        }
      }
    });
  }

  createCategoryChart() {
    new Chart(this.categoryChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Hamburguesas', 'Bebidas', 'Acompañamientos', 'Postres'],
        datasets: [{
          data: [45, 25, 15, 15],
          backgroundColor: ['#3A86FF', '#FFBE0B', '#FB5607', '#8338EC'],
          hoverOffset: 10
        }]
      },
      options: {
        plugins: {
          legend: { position: 'right' }
        }
      }
    });
  }
}
