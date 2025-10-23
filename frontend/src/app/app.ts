import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // ✅ Importar módulo HTTP

@Component({
  selector: 'app-root',
  standalone: true, // asegúrate de tener esto
  imports: [RouterOutlet, HttpClientModule], // ✅ agregar aquí
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}

