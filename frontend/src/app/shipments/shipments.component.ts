import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { trigger, transition, style, animate } from '@angular/animations';
import { ShipmentsService, Shipment } from './shipments.service';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeModule],
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ShipmentsComponent implements OnInit {

  shipments: Shipment[] = [];
  shipment: Shipment = {
    client: '',
    type: '',
    weight: 0,
    dimensions: '',
    destination: '',
    description: '',
    cost: 0,
    status: 'Recibido'
  };

  filterStatus = '';
  startDate?: string;
  endDate?: string;
  loading = false; // Loader visual
  qrData: string | null = null;

  constructor(private shipmentsService: ShipmentsService) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  // 🔄 Cargar envíos
  loadShipments() {
    this.loading = true;
    this.shipmentsService.getShipments().subscribe({
      next: (data) => {
        this.shipments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar envíos:', err);
        this.loading = false;
      }
    });
  }

  // 💰 Calcular costo
  calculateCost() {
    let rate = 0;
    switch (this.shipment.destination.toLowerCase()) {
      case 'guatemala': rate = 25; break;
      case 'mexico':
      case 'méxico': rate = 30; break;
      case 'usa':
      case 'eeuu':
      case 'estados unidos': rate = 50; break;
      default: rate = 40;
    }
    this.shipment.cost = this.shipment.weight * rate;
  }

  // 🧾 Registrar envío
  registerShipment() {
    this.loading = true;

    this.shipmentsService.createShipment(this.shipment).subscribe({
      next: (res: any) => {
        console.log('📦 Respuesta del backend:', res);

        // ✅ Obtener número de guía correctamente
        const tracking = res?.tracking_number || res?.data?.tracking_number || null;

        this.loading = false; // 🔹 Siempre apagar loader

        if (tracking) {
          this.qrData = tracking; // ✅ Generar QR correctamente
          alert(`✅ Envío registrado correctamente\nNúmero de guía: ${tracking}`);
          this.clearForm();
          this.loadShipments();
        } else {
          alert('⚠️ Envío creado, pero no se recibió número de guía.');
        }
      },
      error: (err) => {
        console.error('❌ Error al registrar envío:', err);
        this.loading = false;
        alert('❌ No se pudo registrar el envío.');
      }
    });
  }

  // ✏️ Editar envío
  editShipment(shipment: Shipment) {
    this.shipment = { ...shipment };
    this.qrData = shipment.tracking_number ?? null;
  }

  // 💾 Actualizar envío
  updateShipment() {
    if (!this.shipment.id) {
      alert('⚠️ Selecciona un envío para actualizar');
      return;
    }

    this.loading = true;
    this.shipmentsService.updateShipment(this.shipment.id, this.shipment).subscribe({
      next: () => {
        alert('✅ Envío actualizado correctamente');
        this.clearForm();
        this.loadShipments();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al actualizar envío:', err);
        this.loading = false;
      }
    });
  }

  // 🗑️ Eliminar envío
  cancelShipment(id: string | undefined) {
    if (!id) return;
    if (!confirm('¿Deseas eliminar este envío?')) return;

    this.loading = true;
    this.shipmentsService.deleteShipment(id).subscribe({
      next: () => {
        alert('🗑️ Envío eliminado correctamente');
        this.loadShipments();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al eliminar envío:', err);
        this.loading = false;
      }
    });
  }

  // 🧹 Limpiar formulario
  clearForm() {
    this.shipment = {
      client: '',
      type: '',
      weight: 0,
      dimensions: '',
      destination: '',
      description: '',
      cost: 0,
      status: 'Recibido'
    };
    // No borramos el QR para que se pueda escanear después
  }

  // 🔍 Filtrar por estado
  filterByStatus() {
    if (!this.filterStatus) return this.shipments;
    return this.shipments.filter((s) => s.status === this.filterStatus);
  }
}
