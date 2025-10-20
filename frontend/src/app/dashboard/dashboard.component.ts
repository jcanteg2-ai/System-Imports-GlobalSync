import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importar subcomponentes
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardsComponent } from './cards/cards.component';
import { ChartsComponent } from './charts/charts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent,
    CardsComponent,
    ChartsComponent
  ]
})
export class DashboardComponent {

  // 🔹 Título general del panel
  titulo = 'Panel de Control - Sistema de Importaciones';

  // 🔹 Meses disponibles para filtrar
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // 🔹 Mes seleccionado (por defecto Enero)
  selectedMonth: string = 'Enero';

  // 🔹 Función que se ejecuta al cambiar el mes
  onMonthChange(event: any) {
    this.selectedMonth = event.target.value;
    console.log('📅 Mes seleccionado:', this.selectedMonth);
    // Aquí puedes agregar lógica para recargar métricas o gráficas dinámicamente
  }

 } // 🔹 Generar PDF
