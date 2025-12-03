import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) { }

  updateTitle(title: string) {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
  }

  updateDescription(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
  }

  updateKeywords(keywords: string) {
    this.metaService.updateTag({ name: 'keywords', content: keywords });
  }

  updateCanonicalUrl(url: string) {
    const head = this.document.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null = this.document.querySelector(`link[rel='canonical']`) || null;
    if (!element) {
      element = this.document.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
    
    this.metaService.updateTag({ property: 'og:url', content: url });
  }
  
  updateImage(imageUrl: string) {
      this.metaService.updateTag({ property: 'og:image', content: imageUrl });
      this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
  }
}
