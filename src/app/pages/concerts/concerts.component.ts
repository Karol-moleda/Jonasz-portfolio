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
  activeArchiveYear = signal<string>('all'); // Changed to string to support dynamic years
  upcomingConcerts = signal<Concert[]>([]);
  pastConcerts = signal<Concert[]>([]);
  availableYears = signal<number[]>([]); // Available years for archive tabs
  pastConcertsByYear = signal<Map<number, Concert[]>>(new Map()); // Concerts grouped by year

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

    const pastConcerts = concerts
      .filter(c => new Date(c.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    this.pastConcerts.set(pastConcerts);

    // Get available years and group concerts by year
    const yearsSet = new Set<number>();
    const concertsByYear = new Map<number, Concert[]>();

    pastConcerts.forEach(concert => {
      const year = new Date(concert.date).getFullYear();
      yearsSet.add(year);
      
      if (!concertsByYear.has(year)) {
        concertsByYear.set(year, []);
      }
      concertsByYear.get(year)!.push(concert);
    });

    // Sort years in descending order (newest first)
    const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);
    
    this.availableYears.set(sortedYears);
    this.pastConcertsByYear.set(concertsByYear);

    console.log('Upcoming concerts:', this.upcomingConcerts());
    console.log('Past concerts:', this.pastConcerts());
  });
}
  setActiveTab(tab: 'upcoming' | 'archive'): void {
    this.activeTab.set(tab);
    if (tab === 'archive') {
      this.activeArchiveYear.set('all');
    }
  }

  setActiveArchiveYear(year: string): void {
    this.activeArchiveYear.set(year);
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
    if (this.activeTab() === 'upcoming') {
      return this.upcomingConcerts();
    } else {
      // Archive tab
      const selectedYear = this.activeArchiveYear();
      if (selectedYear === 'all') {
        return this.pastConcerts();
      } else {
        const year = parseInt(selectedYear);
        return this.pastConcertsByYear().get(year) || [];
      }
    }
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

  getTicketingType(concert: Concert): 'free' | 'paid' | 'registration' {
    // Prefer explicit ticketing.type when present
    if (concert.ticketing?.type) return concert.ticketing.type;
    // Legacy fallback: if old top-level ticketLink exists, treat as paid
    if (concert.ticketLink) return 'paid';
    // Default: free entry
    return 'free';
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
