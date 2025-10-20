import { Routes } from '@angular/router';
import { PublicPageComponent } from './public/public-page/public-page.component';  // ✅ ruta corregida
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShipmentsComponent } from './shipments/shipments.component';

export const appRoutes: Routes = [
  // 🏠 Página principal pública (rastreo sin login)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PublicPageComponent },

  // 🔐 Inicio de sesión
  { path: 'login', component: LoginComponent },

  // 📊 Dashboard privado (solo después de login)
  { path: 'dashboard', component: DashboardComponent },

  
  {path: 'shipments', component: ShipmentsComponent },


  // 🚫 Cualquier ruta no existente redirige al home
  { path: '**', redirectTo: 'home' }

  ];

