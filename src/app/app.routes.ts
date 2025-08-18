import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'portfolio',
    loadComponent: () => import('./layout/layoutPage.component').then(m => m.LayoutPageComponent),
    children: [
      {
        path: 'projects',
        loadComponent: () => import('./pages/projectsPage/projectsPage.component').then(m => m.ProjectsPageComponent)
      },
      {
        path: 'skills',
        loadComponent: () => import('./pages/skillsPage/skillsPage.component').then(m => m.SkillsPageComponent)
      },
      {
        path: 'experience',
        loadComponent: () => import('./pages/experiencePage/experiencePage.component').then(m => m.ExperiencePageComponent)
      },
      {
        path: 'education',
        loadComponent: () => import('./pages/educationPage/educationPage.component').then(m => m.EducationPageComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contactPage/contactPage.component').then(m => m.ContactPageComponent)
      },
      {
        path: 'project/:id',
        loadComponent: () => import('./pages/projectPage/projectPage.component').then(m => m.ProjectPageComponent)
      },
      {
        path: '',
        redirectTo: 'experience',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'experience'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'portfolio',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'portfolio'
  }
];
