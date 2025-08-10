import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { DataService } from '../../services/data.service';
import { Recording } from '../../models/recording';

@Component({
  selector: 'app-recordings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recordings.component.html',
  styleUrl: './recordings.component.scss'
})
export class RecordingsComponent implements OnInit {
  recordings = signal<Recording[]>([]);

  constructor(
    private translationService: TranslationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadRecordings();
  }

  private loadRecordings(): void {
    this.dataService.getRecordings().subscribe(recordings => {
      this.recordings.set(recordings);
    });
  }

  getTranslation(key: string): string {
    return this.translationService.get(key);
  }

  openYouTube(url: string): void {
    window.open(url, '_blank');
  }
} 