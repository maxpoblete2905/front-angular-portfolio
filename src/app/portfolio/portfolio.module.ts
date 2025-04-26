import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { ProjectPageComponent } from './pages/projectPage/projectPage.component';
import { SkillsPageComponent } from './pages/skillsPage/skillsPage.component';
import { ExperiencePageComponent } from './pages/experiencePage/experiencePage.component';
import { EducationPageComponent } from './pages/educationPage/educationPage.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsPageComponent } from './pages/projectsPage/projectsPage.component';
import { ContactPageComponent } from './pages/contactPage/contactPage.component';
import { LayoutPageComponent } from './layout/layoutPage.component';

@NgModule({
  declarations: [
    ProjectsPageComponent,
    LayoutPageComponent,
    ProjectPageComponent,
    SkillsPageComponent,
    ContactPageComponent,
    ExperiencePageComponent,
    EducationPageComponent,
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PortfolioModule { }
