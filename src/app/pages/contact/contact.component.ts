import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private formspreeEndpoint = 'https://formspree.io/f/xwpwryyo';

  contactForm = {
    name: '',
    email: '',
    message: '',
    honeypot: '' 
  };
  showModal = false;

  sending = false;
  sendSuccess = false;
  sendError = '';
  validationError = '';

  constructor(private translationService: TranslationService, private http: HttpClient) {}

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

  validateForm(): boolean {
    if (this.contactForm.honeypot && this.contactForm.honeypot.trim() !== '') {
      this.validationError = 'Spam wykryty.';
      return false;
    }
    if (!this.contactForm.name?.trim()) {
      this.validationError = this.getTranslation('contact.validationName') || 'Podaj imię!';
      return false;
    }
    if (!this.contactForm.email?.trim() || !this.validateEmail(this.contactForm.email)) {
      this.validationError = this.getTranslation('contact.validationEmail') || 'Podaj poprawny email!';
      return false;
    }
    if (!this.contactForm.message?.trim()) {
      this.validationError = this.getTranslation('contact.validationMessage') || 'Wpisz wiadomość!';
      return false;
    }
    this.validationError = '';
    return true;
  }
  validateEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }
  sendForm() {
    this.sendSuccess = false;
    this.sendError = '';
    this.sending = true;
    if (!this.validateForm()) {
      this.sending = false;
      return;
    }
    const payload = {
      name: this.contactForm.name,
      email: this.contactForm.email,
      message: this.contactForm.message
    };

    this.http.post(this.formspreeEndpoint, payload, { headers: { 'Accept': 'application/json' } }).subscribe({
      next: (res: any) => {
        this.sendSuccess = !!res?.ok || true;
        this.contactForm = { name: '', email: '', message: '', honeypot: '' };
        this.sending = false;
        this.showModal = true;
      },
      error: (err) => {
        const fallback = 'Błąd podczas wysyłania wiadomości.';
        const msg = err?.error?.errors?.[0]?.message || err?.message || fallback;
        this.sendError = msg;
        this.sending = false;
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }
} 