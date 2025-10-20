import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Shipment {
  id?: string;
  tracking_number?: string;   // ✅ Importante: agrega este campo
  client: string;
  type: string;
  weight: number;
  dimensions: string;
  destination: string;
  description?: string;
  cost: number;
  status: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  private apiUrl = 'http://127.0.0.1:8000/shipments';

  constructor(private http: HttpClient) {}

  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.apiUrl}/`);
  }

  createShipment(shipment: Shipment): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, shipment);
  }

  updateShipment(id: string, shipment: Shipment): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, shipment);
  }

  deleteShipment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
