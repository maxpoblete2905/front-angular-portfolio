// experiencePage.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'portfolio-experience-page',
  templateUrl: './experiencePage.component.html',
  styleUrls: ['./experiencePage.component.css']
})
export class ExperiencePageComponent {
  skills = [
    { name: 'Angular', experience: '6+ años de experiencia', icon: 'assets/icons/angular.svg' },
    { name: 'Node.js', experience: '5+ años de experiencia', icon: 'assets/icons/nodejs.svg' },
    { name: 'Diseño UI/UX', experience: 'Experto en experiencia de usuario', icon: 'assets/icons/design.svg' },
    { name: 'Cloud', experience: 'AWS, Azure & Google Cloud', icon: 'assets/icons/cloud.svg' }
  ];

  projects = [
    {
      title: 'Plataforma E-commerce',
      description: 'Solución escalable para retailer con 50k+ productos',
      tech: ['Angular', 'Node.js', 'MongoDB', 'AWS'],
      image: 'assets/projects/ecommerce.jpg'
    },
    {
      title: 'Sistema de Gestión',
      description: 'Herramienta empresarial para gestión de procesos',
      tech: ['React', 'Python', 'PostgreSQL', 'Docker'],
      image: 'assets/projects/management.jpg'
    },
    {
      title: 'Aplicación Móvil',
      description: 'App de salud con más de 100k descargas',
      tech: ['Ionic', 'Firebase', 'Google Maps API'],
      image: 'assets/projects/mobile-app.jpg'
    }
  ];
}