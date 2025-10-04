import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { Article } from '../../models/article';
import { SanityService } from '../../services/sanity.service';
import { getLocalizedText } from '../../utils/translation.utils';

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
    private articleService: SanityService,
  ) {}

  ngOnInit(): void {
    this.getArticles()
  }


  private  getArticles(): void {
    this.articleService.getArticles().subscribe((res:any) => {
      const sorted = [...res.result].sort((a: Article, b: Article) => {
        const da = new Date(a.date).getTime();
        const db = new Date(b.date).getTime();
        // Handle invalid dates: place them at the end
        if (isNaN(da) && isNaN(db)) return 0;
        if (isNaN(da)) return 1;
        if (isNaN(db)) return -1;
        return db - da; // newest first
      });
      this.articles.set(sorted);
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

  getLocalizedTitle(article: Article): string {
    return getLocalizedText(article.title, this.translationService.getCurrentLanguage());
  }
}
