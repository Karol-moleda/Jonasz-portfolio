import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslationService, Language } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = signal(false);

  constructor(
    public translationService: TranslationService,
    private router: Router
  ) {}

  toggleMenu(): void {
    const next = !this.isMenuOpen();
    this.isMenuOpen.set(next);
    this.toggleBodyScroll(next);
  }

  closeMenu(): void {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
      this.toggleBodyScroll(false);
    }
  }

  switchLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  getNavigationItems() {
    return [
      { path: '/', label: this.translationService.get('navigation.home') },
      { path: '/concerts', label: this.translationService.get('navigation.concerts') },
  { path: '/biography', label: this.translationService.get('navigation.biography') },
      { path: '/articles', label: this.translationService.get('navigation.articles') },
      { path: '/gallery', label: this.translationService.get('navigation.gallery') },
      { path: '/recordings', label: this.translationService.get('navigation.recordings') },
      { path: '/contact', label: this.translationService.get('navigation.contact') }
    ];
  }

  getSocialLinks() {
    return [
      { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
      { name: 'Facebook', icon: 'fab fa-facebook', url: 'https://facebook.com' },
      { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://youtube.com' },
      { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' }
    ];
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // ensure scroll is restored if component unmounts
    this.toggleBodyScroll(false);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { this.closeMenu(); }

  private toggleBodyScroll(lock: boolean): void {
    const html = document.documentElement;
    const body = document.body;
    if (lock) {
      html.classList.add('no-scroll');
      body.classList.add('no-scroll');
    } else {
      html.classList.remove('no-scroll');
      body.classList.remove('no-scroll');
    }
  }
} 