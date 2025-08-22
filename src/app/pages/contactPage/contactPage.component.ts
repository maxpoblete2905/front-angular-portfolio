import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Contact } from '@app/interfaces'
import { ContactInformationComponent } from '@app/shared/components/contact-Information/contactInformation.component'

@Component({
  selector: 'portfolio-contact-page',
  templateUrl: './contactPage.component.html',
  styleUrls: ['./contactPage.component.css'],
  imports: [CommonModule, ContactInformationComponent, ReactiveFormsModule]
})
export class ContactPageComponent implements OnInit {
  public messages: Contact[] = []
  public loadingMessages: boolean = false
  public isLoading: boolean = false
  public showAlert: boolean = false
  public alertMessage: string = ''
  public alertType: 'success' | 'error' = 'success'

  public contactForm: FormGroup

  public statusConfig = {
    pending: {
      icon: '⏳',
      color: 'text-yellow-400',
      label: 'Pendiente',
    },
    read: {
      icon: '✓',
      color: 'text-blue-400',
      label: 'Leído',
    },
    replied: {
      icon: '↩️',
      color: 'text-green-400',
      label: 'Respondido',
    },
    archived: {
      icon: '📁',
      color: 'text-gray-400',
      label: 'Archivado',
    },
  }

  constructor(private fb: FormBuilder,) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    })
  }

  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages(): void {
    this.loadingMessages = true
  }

  onSave(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched()
      return
    }

    this.isLoading = true

  }

  showSuccess(message: string): void {
    this.alertMessage = message
    this.alertType = 'success'
    this.showAlert = true
    setTimeout(() => (this.showAlert = false), 5000)
  }

  showError(message: string): void {
    this.alertMessage = message
    this.alertType = 'error'
    this.showAlert = true
    setTimeout(() => (this.showAlert = false), 5000)
  }

  isValidField(field: string): boolean | null {
    const control = this.contactForm.get(field)
    if (!control) return null
    return control?.invalid && control?.touched
  }

  getFieldError(field: string): string | null {
    const control = this.contactForm.get(field)
    if (!control || !control.errors) return null

    const errors = control.errors
    if (errors['required']) return 'Campo requerido'
    if (errors['email']) return 'Email inválido'
    if (errors['minlength'])
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`

    return null
  }
}
