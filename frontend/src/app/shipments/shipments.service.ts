import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Shipment {
  id?: string;
  tracking_number?: string;
  client: string;
  type: string;
  weight: number;
  dimensions: string;
  destination: string;
  description?: string;
  cost: number;
  status: string;

  // 🆕 Nuevos campos del destinatario
  receiver_name: string;
  receiver_phone: string;
  receiver_email: string;
  receiver_address: string;

  created_at?: string;
}


@Injectable({ providedIn: 'root' })
export class ShipmentsService {
  private apiUrl = 'http://127.0.0.1:8000/shipments'; // tu backend FastAPI

  constructor(private http: HttpClient) {}

  // ✅ Crear un envío
  createShipment(shipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(`${this.apiUrl}/`, shipment);
  }

  // 📋 Obtener todos los envíos
  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.apiUrl);
  }

  // 🔄 Actualizar
  updateShipment(id: string, shipment: Shipment): Observable<Shipment> {
    return this.http.put<Shipment>(`${this.apiUrl}/${id}`, shipment);
  }

  // 🗑️ Eliminar
  deleteShipment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
