import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // 👈 esto permite usar <ion-icon>
})
export class LoginComponent {
  email = '';
  password = '';
  nombre = '';
  nuevoEmail = '';
  nuevoPassword = '';
  showRegister = false;

  onLogin() {
    console.log('Inicio de sesión:', this.email, this.password);
  }

  onRegister() {
    console.log('Registro:', this.nombre, this.nuevoEmail, this.nuevoPassword);
  }

  toggleForm() {
    this.showRegister = !this.showRegister;
  }
}
