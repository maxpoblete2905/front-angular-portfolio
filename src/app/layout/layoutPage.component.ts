import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // RouterOutlet es esencial para rutas hijas
  template: `
    <div class="layout">
      <!-- Tu header/navbar aquí -->
      <router-outlet></router-outlet> <!-- Aquí se renderizarán las rutas hijas -->
      <!-- Tu footer aquí -->
    </div>
  `,
})
export class LayoutPageComponent { }
