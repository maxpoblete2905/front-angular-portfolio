import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

interface ContactInformation {
  value: string;
  label: string;
  icon: string;
}

const contactArray: ContactInformation[] = [
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/portfolio-549f8.appspot.com/o/portfolio%2Fwhatsapp.png?alt=media&token=e0e7b1e3-ea87-45aa-af0b-6fc1c4b24327",
    label: "whatsapp",
    value: "+569 94212670"
  },
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/portfolio-549f8.appspot.com/o/portfolio%2Fring-phone.png?alt=media&token=fb7e3b9c-fa43-45dc-9380-56a37c1f4cfc",
    label: "phone",
    value: "9 26105950"
  },
  {
    icon: "https://firebasestorage.googleapis.com/v0/b/portfolio-549f8.appspot.com/o/portfolio%2Fgmail.png?alt=media&token=8d76c695-5669-449e-b155-77157cc58ad9",
    label: "email",
    value: "max.poblete2905@gmail.com"
  }
];

@Component({
  selector: 'shared-contact-information',
  templateUrl: './contactInformation.component.html',
  styleUrls: ['./contactInformation.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContactInformationComponent implements OnInit {
  personalInformation: ContactInformation[] = contactArray;

  constructor() {
  }

  ngOnInit(): void {

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
