import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';
import { ShipmentsService, Shipment } from './shipments.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeComponent],
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent {
  shipment: Shipment = {
    client: '',
    type: '',
    weight: 0,
    dimensions: '',
    destination: '',
    description: '',
    cost: 0,
    status: 'Recibido',
    receiver_name: '',
    receiver_phone: '',
    receiver_email: '',
    receiver_address: ''
  };

  qrVisible = false;
  generatedGuide = '';
  savedShipment?: Shipment;

  constructor(private shipmentService: ShipmentsService) {}

  registerShipment() {
    this.shipmentService.createShipment(this.shipment).subscribe({
      next: (res) => {
        this.savedShipment = res;
        this.generatedGuide = res.tracking_number ?? '';
        this.qrVisible = true;
      },
      error: (err) => console.error('Error al crear envío:', err)
    });
  }

  async downloadPDF() {
    const content = document.getElementById('pdf-content');
    if (!content) {
      console.error('No se encontró el contenedor del PDF.');
      return;
    }

    // Esperar a que el QR se renderice bien antes de capturarlo
    await new Promise((resolve) => setTimeout(resolve, 600));

    const canvas = await html2canvas(content, { scale: 3, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;

    // 🧭 Encabezado
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(0, 43, 92);
    pdf.text('GlobalSync - Guía de Envío', margin, 20);
    pdf.setDrawColor(0, 43, 92);
    pdf.setLineWidth(0.8);
    pdf.line(margin, 25, pageWidth - margin, 25);

    // 📦 Imagen principal
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', margin, 30, imgWidth, imgHeight);

    // 🧾 Datos del destinatario (espaciado adecuado)
    if (this.savedShipment) {
      let y = 30 + imgHeight + 15;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(0, 43, 92);
      pdf.text('Datos del Destinatario', margin, y);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(50);
      y += 8;
      pdf.text(`Nombre: ${this.savedShipment.receiver_name || 'N/A'}`, margin, y);
      y += 6;
      pdf.text(`Teléfono: ${this.savedShipment.receiver_phone || 'N/A'}`, margin, y);
      y += 6;
      pdf.text(`Correo: ${this.savedShipment.receiver_email || 'N/A'}`, margin, y);
      y += 6;
      pdf.text(`Dirección: ${this.savedShipment.receiver_address || 'N/A'}`, margin, y);
    }

    // 🦶 Pie de página
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text(`Código de guía: ${this.generatedGuide}`, margin, pageHeight - 20);
    pdf.text('© 2025 GlobalSync - Sistema de Importaciones y Exportaciones', margin, pageHeight - 15);

    // 💾 Descargar PDF
    pdf.save(`Guia_${this.generatedGuide}.pdf`);
  }
}
