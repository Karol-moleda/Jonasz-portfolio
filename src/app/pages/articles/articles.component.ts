import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { DataService } from '../../services/data.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  articles = signal<Article[]>([]);

  constructor(
    private translationService: TranslationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  private loadArticles(): void {
    this.dataService.getArticles().subscribe(articles => {
      this.articles.set(articles);
    });
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
} 