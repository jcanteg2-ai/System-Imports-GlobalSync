import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule] // ✅ importante
})
export class NavbarComponent {
  searchMonth: string = '';

  constructor(private http: HttpClient) {}

  generarReportePorMes() {
    const mes = this.searchMonth.trim();
    if (!mes) return;

    console.log('Generando reporte del mes:', mes);

    // 🔹 1. Consultar datos del backend
    const params = new HttpParams().set('month', mes);
    this.http.get('http://127.0.0.1:8000/api/dashboard/metrics', { params })
      .subscribe({
        next: (data: any) => {
          console.log('Datos del mes:', data);
          this.generarPDF(mes);
        },
        error: err => console.error('Error al obtener datos:', err)
      });
  }

  generarPDF(mes: string) {
    const data = document.getElementById('dashboard-content');
    if (!data) return;

    html2canvas(data, { scale: 2 }).then(canvas => {
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const fecha = new Date().toLocaleDateString();

      pdf.setFontSize(16);
      pdf.text('Reporte del Dashboard - System Imports', 105, 15, { align: 'center' });
      pdf.setFontSize(11);
      pdf.text(`Fecha: ${fecha}`, 105, 22, { align: 'center' });
      pdf.text(`Mes filtrado: ${mes}`, 105, 28, { align: 'center' });

      pdf.addImage(contentDataURL, 'PNG', 10, 35, imgWidth, imgHeight);

      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    });
  }
}

