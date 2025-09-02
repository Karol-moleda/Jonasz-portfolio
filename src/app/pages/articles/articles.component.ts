import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { DataService } from '../../services/data.service';
import { Article } from '../../models/article';
import {ArticleService} from '../../services/article.service';

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
    private articleService: ArticleService,
  ) {}

  ngOnInit(): void {
    this.getArticles()
  }


  private  getArticles(): void {
    this.articleService.getArticles().subscribe((res:any) => {
      console.log(res);
      this.articles.set(res.result);
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
