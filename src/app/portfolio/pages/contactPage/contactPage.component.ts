import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../../firestore/firebase.service';
import { Contact } from '../../interfaces';

@Component({
  selector: 'portfolio-contact-page',
  templateUrl: './contactPage.component.html',
  styleUrl: './contactPage.component.css',
})
export class ContactPageComponent {
  public title = 'contacto';
  public message: string = 'Mensaje enviado correctamente';
  public stateMessage: boolean = false;
  private firestoreService: FirestoreService<Contact>;


  public contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private firestore: AngularFirestore) {
    this.firestoreService = new FirestoreService<Contact>(this.firestore);
    this.firestoreService.setCollection('contact-messages');
  }

  onSave(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const data = this.firestoreService.addDocument(this.contactForm.value);
    if (data) {
      this.stateMessage = true;
      setTimeout(() => {
        this.stateMessage = false;
      }, 5000);

      this.contactForm.reset({
        name: '',
        email: '',
        mesage: '',
      });
    }
  }

  isValidfield(field: string): boolean | null {
    return (
      this.contactForm.controls[field].errors &&
      this.contactForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.contactForm.controls[field]) return null;
    const errors = this.contactForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracters.`;
        case 'min':
          return 'el valor minimo es 0';
      }
    }
    return null;
  }
}
