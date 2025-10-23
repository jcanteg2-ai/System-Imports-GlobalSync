import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexGrid
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  @ViewChild('chart') chart!: ChartComponent;

  // 📈 Gráfica de ingresos mensuales
  public lineChartOptions: ChartOptions = {
    series: [
      {
        name: 'Ingresos (USD)',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      toolbar: { show: true }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    title: {
      text: 'Ingresos mensuales',
      align: 'left'
    },
    grid: {
      row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }
    },
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep']
    }
  };

  // 📊 Gráfica de categorías por región
  public barChartOptions: ChartOptions = {
    series: [
      {
        name: 'Volumen de exportaciones por región',
        data: [45, 25, 15, 15]
      }
    ],
    chart: {
      height: 350,
      type: 'bar',
      toolbar: { show: false }
    },
    dataLabels: { enabled: true },
    stroke: { curve: 'straight' },
    title: {
      text: 'Categorías',
      align: 'left'
    },
    grid: {
      row: { colors: ['#f9f9f9', 'transparent'], opacity: 0.5 }
    },
    xaxis: {
      categories: ['Centroamérica', 'Norteamérica', 'Europa', 'Asia']
    }
  };
}

