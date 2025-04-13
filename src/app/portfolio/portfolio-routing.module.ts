import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layout/layoutPage.component';
import { ProjectsPageComponent } from './pages/projectsPage/projectsPage.component';
import { ProjectPageComponent } from './pages/projectPage/projectPage.component';
import { SkillsPageComponent } from './pages/skillsPage/skillsPage.component';
import { ContactPageComponent } from './pages/contactPage/contactPage.component';
import { ExperiencePageComponent } from './pages/experiencePage/experiencePage.component';
import { EducationPageComponent } from './pages/educationPage/educationPage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'projects',
        component: ProjectsPageComponent
      },
      {
        path: 'skills',
        component: SkillsPageComponent
      },
      {
        path: 'experience',
        component: ExperiencePageComponent
      },
      {
        path: 'education',
        component: EducationPageComponent
      },
      {
        path: 'contact',
        component: ContactPageComponent
      },
      {
        path: 'project/:id',
        component: ProjectPageComponent
      },
      {
        path: '**',
        redirectTo: 'experience'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
