import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { DataService } from '../../services/data.service';
import { Concert } from '../../models/concert';

@Component({
  selector: 'app-concerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concerts.component.html',
  styleUrl: './concerts.component.scss'
})
export class ConcertsComponent implements OnInit {
  activeTab = signal<'upcoming' | 'archive'>('upcoming');
  upcomingConcerts = signal<Concert[]>([]);
  pastConcerts = signal<Concert[]>([]);

  constructor(
    private translationService: TranslationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadConcerts();
  }

  private loadConcerts(): void {
    this.dataService.getUpcomingConcerts().subscribe(concerts => {
      this.upcomingConcerts.set(concerts);
    });

    this.dataService.getPastConcerts().subscribe(concerts => {
      this.pastConcerts.set(concerts);
    });
  }

  setActiveTab(tab: 'upcoming' | 'archive'): void {
    this.activeTab.set(tab);
  }

  getTranslation(key: string): string {
    return this.translationService.get(key);
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
    return this.activeTab() === 'upcoming' ? this.upcomingConcerts() : this.pastConcerts();
  }
} 