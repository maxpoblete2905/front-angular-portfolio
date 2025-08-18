import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { finalize } from 'rxjs'
import { CommonModule } from '@angular/common'
import { Contact } from '@app/interfaces'
import { ContactService } from '@app/services/portafolio/contact.service'
import { ContactInformationComponent } from '@app/shared/components/contactInformation/contactInformation.component'


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

  constructor(private fb: FormBuilder, private contactService: ContactService) {
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
    this.contactService.getAll().subscribe({
      next: (messages) => {
        this.messages = messages
        this.loadingMessages = false
      },
      error: (error) => {
        console.error('Error loading messages:', error)
        this.loadingMessages = false
      },
    })
  }

  onSave(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched()
      return
    }

    this.isLoading = true
    this.contactService
      .create(this.contactForm.value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.showSuccess('Mensaje enviado correctamente')
          this.contactForm.reset()
          this.loadMessages()
        },
        error: (error) => {
          console.error('Error:', error)
          this.showError('Error al enviar el mensaje')
        },
      })
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
