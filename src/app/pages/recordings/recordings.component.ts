import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { DataService } from '../../services/data.service';
import { Recording } from '../../models/recording';
import { SanityService } from '../../services/sanity.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer,
    private sanityService: SanityService
  ) {}

  ngOnInit(): void {
    console.log("Init recordings component");
    this.loadRecordings();
  }

  private loadRecordings(): void {
    console.log("dupa")
    this.sanityService.getRecording().subscribe((res: any) => {
      console.log('Recordings response:', res);
      const result = res?.result || [];
      this.recordings.set(result);
    });
  }

  getTranslation(key: string): string {
    return this.translationService.get(key);
  }

  openYouTube(url: string): void {
    window.open(url, '_blank');
  }

  getVideoType(url: string): 'youtube' | 'vimeo' | 'other' {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('vimeo.com')) return 'vimeo';
  return 'other';
}

sanitizeVideoUrl(url: string): SafeResourceUrl {
  let embedUrl = url;

  if (this.getVideoType(url) === 'youtube') {
    const videoId = url.split('v=')[1] || url.split('youtu.be/')[1];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  if (this.getVideoType(url) === 'vimeo') {
    const videoId = url.split('/').pop();
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  }

  return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
}
} 