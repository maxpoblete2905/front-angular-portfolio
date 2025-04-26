import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../environments/environment';

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
    environment.apiUrlProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }