import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { DataService } from '../../services/data.service';
import { Concert } from '../../models/concert';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  upcomingConcerts = signal<Concert[]>([]);
  achievements = signal<string[]>([]);

  constructor(
    private translationService: TranslationService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUpcomingConcerts();
    this.loadAchievements();
  }

  private loadUpcomingConcerts(): void {
    this.dataService.getUpcomingConcerts().subscribe(concerts => {
      this.upcomingConcerts.set(concerts.slice(0, 3)); // Show only first 3
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
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
} 