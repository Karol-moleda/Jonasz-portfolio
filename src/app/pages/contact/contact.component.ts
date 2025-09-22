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

  getMailtoLink(): string {
    const email = 'jonaszjochemczyk@o2.pl';
    const subject = encodeURIComponent(`Wiadomość od ${this.contactForm.name || 'Użytkownika'}`);
    const body = encodeURIComponent(
      `Imię: ${this.contactForm.name}\n` +
      `Email: ${this.contactForm.email}\n\n` +
      `Wiadomość:\n${this.contactForm.message}`
    );
    
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }
} 