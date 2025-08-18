import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ACADEMMIC_COLLECTION, CERTIFICATION_COLLECTION, CONTACT_COLLECTION, PERSONAL_COLLECTION, PROJECTS_COLLECTION, SKILLS_COLLECTION, TECHNOLOGY_COLLECTION } from './core/tokens/collections';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    { provide: PROJECTS_COLLECTION, useValue: 'projects' }, // <-- Soluciona el error
    { provide: SKILLS_COLLECTION, useValue: 'skills' },
    { provide: ACADEMMIC_COLLECTION, useValue: 'academics' },
    { provide: PERSONAL_COLLECTION, useValue: 'personal-information' },
    { provide: CONTACT_COLLECTION, useValue: 'contacts' },
    { provide: CERTIFICATION_COLLECTION, useValue: 'certifications' },
    { provide: TECHNOLOGY_COLLECTION, useValue: 'technologies' },]
};
