import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; // Cambio aquí
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: 'PROJECTS_API_URL', useValue: 'https://api-back-nj-portfolio.onrender.com/projects' },
    { provide: 'SKILLS_API_URL', useValue: 'https://api-back-nj-portfolio.onrender.com/skills' },
    { provide: 'PERSONAL_API_URL', useValue: 'https://api-back-nj-portfolio.onrender.com/personal-information' },
    { provide: 'TECHNOLOGY_API_URL', useValue: 'https://api-back-nj-portfolio.onrender.com/technologies' },
    { provide: 'ACADEMIC_API_URL', useValue: 'https://api-back-nj-portfolio.onrender.com/academic' },
    { provide: 'CERTIFICATION_API_URL', useValue: 'https://api-back-nj-portfolio.onrender.com/certifications' },
    { provide: 'CONTACT_API_URL', useValue: 'https://api-back-nj-portfolio.onrender.com/contacts' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }