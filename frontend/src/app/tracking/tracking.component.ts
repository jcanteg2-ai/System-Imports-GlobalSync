import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent {
  trackingNumber: string = '';
  shipment: any = null;
  message: string = '';

  // 🔹 Simulación de si el usuario ha iniciado sesión
  isLoggedIn = false; // Cambia a true si quieres ver la vista completa

  constructor(private router: Router) {}

  // Datos ficticios para simular envíos
  fakeShipments = [
    {
      guide: 'GSX12345',
      currentStatus: 'En tránsito',
      estimatedDelivery: '21/10/2025',
      history: [
        { date: '18/10/2025', event: 'Salida de bodega central' },
        { date: '19/10/2025', event: 'En tránsito hacia Escuintla' },
        { date: '20/10/2025', event: 'Llegó al centro de distribución Escuintla' }
      ]
    },
    {
      guide: 'GSX67890',
      currentStatus: 'Entregado',
      estimatedDelivery: '17/10/2025',
      history: [
        { date: '15/10/2025', event: 'Salida de bodega principal' },
        { date: '16/10/2025', event: 'En ruta de entrega' },
        { date: '17/10/2025', event: 'Entregado al cliente' }
      ]
    }
  ];

  // Buscar envío
  searchShipment() {
    this.message = '';
    this.shipment = null;

    const found = this.fakeShipments.find(
      s => s.guide.toLowerCase() === this.trackingNumber.trim().toLowerCase()
    );

    if (found) {
      this.shipment = found;
    } else {
      this.message = `No se encontró ningún envío con el número de guía "${this.trackingNumber}".`;
    }
  }

  // Redirige al login o registro
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
