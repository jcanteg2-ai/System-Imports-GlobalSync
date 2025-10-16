import { Component } from '@angular/core';

// Importar los subcomponentes del dashboard
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
    NavbarComponent,
    SidebarComponent,
    CardsComponent,
    ChartsComponent
  ]
})
export class DashboardComponent {
  // Puedes definir aquí variables globales del dashboard si deseas
  titulo = 'Panel de Control - Sistema de Importaciones';
}

