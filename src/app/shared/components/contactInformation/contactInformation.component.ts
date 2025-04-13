import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../firestore/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface ContactInformation {
  value: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'shared-contact-information',
  templateUrl: './contactInformation.component.html',
  styleUrls: ['./contactInformation.component.css'],
  standalone: false
})
export class ContactInformationComponent implements OnInit {
  private firestoreService: FirestoreService<ContactInformation>;
  personalInformation: ContactInformation[] = [];

  constructor(private firestore: AngularFirestore) {
    this.firestoreService = new FirestoreService<ContactInformation>(this.firestore);
    this.firestoreService.setCollection('contact-Information');
  }

  ngOnInit(): void {
    this.firestoreService.getDocuments().subscribe({
      next: (personal) => {
        this.personalInformation = personal;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      },
    });
  }

  realizarAccion(seleccion: string, value: string): void {
    switch (seleccion) {
      case 'phone':
        window.location.href = `tel:+${value}`;
        break;
      case 'whatsapp':
        window.open('https://web.whatsapp.com/', '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
    }
  }
}
