import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),  // ✅ volver a activar modo sin Zone.js
    provideRouter(appRoutes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withFetch())
  ]
};
