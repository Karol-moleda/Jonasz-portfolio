import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ConcertsComponent } from '../concerts/concerts.component';
import { Concert } from '../../models/concert';
import { SanityService } from '../../services/sanity.service';
import { getLocalizedText } from '../../utils/translation.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ConcertsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  upcomingConcerts = signal<Concert[]>([]);
  achievements = signal<string[]>([]);

  constructor(
    private translationService: TranslationService,
    private sanityService: SanityService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUpcomingConcerts();
    this.loadAchievements();
    // Re-load achievements whenever translations are (re)loaded
    this.translationService.translations$.subscribe(() => {
      this.loadAchievements();
    });
  }

  private loadUpcomingConcerts(): void {
      this.sanityService.getConcerts().subscribe((concerts: Concert[]) => {

    const now = new Date();

    this.upcomingConcerts.set(
      concerts.filter(c => new Date(c.date) >= now)
    );


  });
}
  

  private loadAchievements(): void {
    this.achievements.set(this.translationService.getArray('home.achievements.items'));
  }

  getTranslation(key: string): string {
    return this.translationService.get(key);
  }

  navigateToBiography(): void {
    this.router.navigate(['/biography']);
  }

  navigateToConcerts(): void {
    this.router.navigate(['/concerts']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const currentLang = this.translationService.getCurrentLanguage();
    const locale = currentLang === 'pl' ? 'pl-PL' : currentLang === 'en' ? 'en-US' : 'it-IT';
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  getLocalizedConcertTitle(concert: Concert): string {
    return getLocalizedText(concert.title, this.translationService.getCurrentLanguage());
  }

  getLocalizedConcertLocation(concert: Concert): string {
    return getLocalizedText(concert.location, this.translationService.getCurrentLanguage());
  }

  getLocalizedConcertVenue(concert: Concert): string {
    return getLocalizedText(concert.venue, this.translationService.getCurrentLanguage());
  }

  getLocalizedConcertProgram(concert: Concert): string {
    return getLocalizedText(concert.program, this.translationService.getCurrentLanguage());
  }
} 