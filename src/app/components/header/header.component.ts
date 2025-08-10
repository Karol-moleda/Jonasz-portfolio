import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = signal(false);

  constructor(
    public translationService: TranslationService,
    private router: Router
  ) {}

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  switchLanguage(lang: 'pl' | 'en'): void {
    this.translationService.setLanguage(lang);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  getNavigationItems() {
    return [
      { path: '/', label: this.translationService.get('navigation.home') },
      { path: '/biography', label: this.translationService.get('navigation.biography') },
      { path: '/concerts', label: this.translationService.get('navigation.concerts') },
      { path: '/articles', label: this.translationService.get('navigation.articles') },
      { path: '/gallery', label: this.translationService.get('navigation.gallery') },
      { path: '/recordings', label: this.translationService.get('navigation.recordings') },
      { path: '/contact', label: this.translationService.get('navigation.contact') }
    ];
  }
} 