import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  activeCategory = signal<'all' | 'sessions' | 'concerts'>('all');

  constructor(private translationService: TranslationService) {}

  setActiveCategory(category: 'all' | 'sessions' | 'concerts'): void {
    this.activeCategory.set(category);
  }

  getTranslation(key: string): string {
    return this.translationService.get(key);
  }
} 