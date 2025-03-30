import { Component, OnInit } from '@angular/core';
import { DarkMode, Project } from '../../interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../../../firestore/firebase.service';

@Component({
  selector: 'portfolio-projects-page',
  templateUrl: './projectsPage.component.html',
  styleUrls: ['./projectsPage.component.css'],
})

export class ProjectsPageComponent implements OnInit {
  title: string = 'proyectos';
  projects: Project[] = [];
  private firestoreService: FirestoreService<Project>;
  private firebaseDarkMode: FirestoreService<DarkMode>;
  public darkMode: boolean = true;

  constructor(private firestore: AngularFirestore) {
    this.firestoreService = new FirestoreService<Project>(this.firestore);
    this.firestoreService.setCollection('projects');
    this.firebaseDarkMode = new FirestoreService<DarkMode>(this.firestore);
    this.firebaseDarkMode.setCollection('style');
  }

  ngOnInit(): void {
    this.firebaseDarkMode.getDocuments().subscribe({
      next: (data: DarkMode[]) => {
        console.log(data)
        this.darkMode = data[0].isStyleOne
      },
      error: (error: unknown) => {
        console.error('Error cargando darkMode:', error);
      }
    });

    this.firestoreService.getDocuments().subscribe({
      next: (projects) => {
        this.projects = projects.filter((t) => t.state === true);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

}
