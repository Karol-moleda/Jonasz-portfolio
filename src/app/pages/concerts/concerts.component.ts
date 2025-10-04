import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Concert } from '../../models/concert';
import { SanityService } from '../../services/sanity.service';
import { TranslationService } from '../../services/translation.service';
import { getLocalizedText } from '../../utils/translation.utils';


@Component({
  selector: 'app-concerts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})
export class ConcertsComponent implements OnInit {
  activeTab = signal<'upcoming' | 'archive'>('upcoming');
  upcomingConcerts = signal<Concert[]>([]);
  pastConcerts = signal<Concert[]>([]);

  constructor(private sanityService: SanityService, private translationService: TranslationService,) {}

ngOnInit(): void {
  this.loadConcerts();
}

private loadConcerts(): void {
  this.sanityService.getConcerts().subscribe((concerts: Concert[]) => {

    const now = new Date();

    this.upcomingConcerts.set(
      concerts.filter(c => new Date(c.date) >= now)
    );

    this.pastConcerts.set(
      concerts.filter(c => new Date(c.date) < now)
    );

    console.log('Upcoming concerts:', this.upcomingConcerts());
    console.log('Past concerts:', this.pastConcerts());
  });
}
  setActiveTab(tab: 'upcoming' | 'archive'): void {
    this.activeTab.set(tab);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  getConcerts(): Concert[] {
    return this.activeTab() === 'upcoming'
      ? this.upcomingConcerts()
      : this.pastConcerts();
  }

    getTranslation(key: string): string {
    return this.translationService.get(key);
  }

  getLocalizedTitle(concert: Concert): string {
    return getLocalizedText(concert.title, this.translationService.getCurrentLanguage());
  }

  getLocalizedLocation(concert: Concert): string {
    return getLocalizedText(concert.location, this.translationService.getCurrentLanguage());
  }

  getLocalizedVenue(concert: Concert): string {
    return getLocalizedText(concert.venue, this.translationService.getCurrentLanguage());
  }

  getLocalizedProgram(concert: Concert): string {
    return getLocalizedText(concert.program, this.translationService.getCurrentLanguage());
  }

  getLocalizedPrice(concert: Concert): string {
    if (!concert.ticketing?.price) return '';
    return getLocalizedText(concert.ticketing.price, this.translationService.getCurrentLanguage());
  }

  getTicketingType(concert: Concert): 'free' | 'paid' | 'registration' | null {
    return concert.ticketing?.type || null;
  }

  getEventLink(concert: Concert): string | null {
    return concert.ticketing?.eventLink || null;
  }

  getTicketLink(concert: Concert): string | null {
    // Support both new and old structure for backward compatibility
    return concert.ticketing?.ticketLink || concert.ticketLink || null;
  }

  getRegistrationLink(concert: Concert): string | null {
    return concert.ticketing?.registrationLink || null;
  }
}
