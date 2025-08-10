import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private translationService: TranslationService) {}

  getTranslation(key: string): string {
    return this.translationService.get(key);
  }

  onSubmit(): void {
    // Handle form submission
    console.log('Form submitted:', this.contactForm);
    // Here you would typically send the form data to your backend
    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
    this.resetForm();
  }

  private resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      message: ''
    };
  }
} 