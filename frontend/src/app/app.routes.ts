import { Routes } from '@angular/router';
import { PublicPageComponent } from './public/public-page/public-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShipmentsComponent } from './shipments/shipments.component';

export const appRoutes: Routes = [
  // 🌍 Página pública (rastreo)
  { path: 'home', component: PublicPageComponent },

  // 🔐 Inicio de sesión
  { path: 'login', component: LoginComponent },

  // 📦 Gestión de envíos
  { path: 'shipments', component: ShipmentsComponent },

  // 📊 Dashboard principal
  { path: 'dashboard', component: DashboardComponent },
  

  // 🏠 Ruta raíz redirige a home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 🚫 Ruta por defecto para no encontradas
  { path: '**', redirectTo: 'home' }
];
