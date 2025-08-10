import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { Nl2brPipe } from '../../pipes/nl2br.pipe';

@Component({
  selector: 'app-biography',
  standalone: true,
  imports: [CommonModule, Nl2brPipe],
  templateUrl: './biography.component.html',
  styleUrl: './biography.component.scss'
})
export class BiographyComponent {
  constructor(private translationService: TranslationService) {}

  getTranslation(key: string): string {
    return this.translationService.get(key);
  }

  getBiographyText(): string {
    return this.translationService.get('biography.fullText');
  }
} 