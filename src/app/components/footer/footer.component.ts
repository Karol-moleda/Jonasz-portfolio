import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public translationService: TranslationService) {}

  getSocialMediaLinks() {
    return [
      { name: 'Facebook', icon: 'fab fa-facebook', url: 'https://https://www.facebook.com/jonasz.jochemczyk' },
      { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/jonaszjochemczyk_pianist/' },
      { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://www.youtube.com/@jonaszjochemczyk' }
    ];
  }
} 