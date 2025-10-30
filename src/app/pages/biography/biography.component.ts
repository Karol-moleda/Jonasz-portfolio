import {Component, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SanityService} from '../../services/sanity.service';
import {Biography} from '../../models/biography';
import { TranslationService } from '../../services/translation.service';
import { getLocalizedText, getLocalizedContent } from '../../utils/translation.utils';

@Component({
  selector: 'app-biography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './biography.component.html',
  styleUrl: './biography.component.scss'
})
export class BiographyComponent implements OnInit {
  biography = signal<Biography | null>(null);

  activeTab = signal<number>(0);
  constructor(
    private sanityService: SanityService,
    private translationService: TranslationService
  ) {}
  ngOnInit() {
    this.getBiography();
  }

  private  getBiography(): void {
    this.sanityService.getBiography().subscribe((res:any) => {
      const result = res?.result || {};
      const rawSections = result.sections || [];
      const normalizedSections = this.normalizeSections(rawSections);
      result.sections = normalizedSections;
      this.biography.set(result);

      const visible = (normalizedSections || []).slice(0, 5);
      const lowerHeadings = visible.map((s: any) => this.getLocalizedHeading(s).toLowerCase());
      const idx = lowerHeadings.findIndex((h: string) =>
        h.includes('wczesne życie') ||
        h.includes('wczesne zycie') ||
        h.includes('edukac') ||
        (h.includes('wczesne') && (h.includes('życie') || h.includes('zycie') || h.includes('edukac')))
      );
      this.activeTab.set(idx >= 0 ? idx : 0);
    });
  }


  private extractAllNumberedSegments(blocks: any[]): string[] | null {
    if (!blocks || !blocks.length) return null;
    const fullText = blocks
      .map(b => (b._type === 'block' ? b.children.map((c: any) => c.text).join('') : ''))
      .join('\n\n')
      .trim();

    const numberedRegex = /\n?\s*\d+\.\s+/g;
    const matches = fullText.match(numberedRegex);
    if (!matches || matches.length < 2) return null;
    const segments = fullText.split(/(?=\n?\s*\d+\.\s+)/g).map(s => s.trim()).filter(Boolean);
    return segments.map(seg => seg.replace(/^\s*\d+\.\s*/, '').trim());
  }

  private normalizeSections(sections: any[]): any[] {
    if (!sections || !sections.length) return sections || [];
    const othersHaveContent = sections.slice(1).some(s => (s?.content || []).length > 0);
    if (othersHaveContent) return sections; 

    const first = sections[0];
    const allSegments = this.extractAllNumberedSegments(first?.content || []);
    if (!allSegments) return sections;

    const normalized: any[] = [];
    const count = Math.max(allSegments.length, sections.length);
    for (let i = 0; i < count; i++) {
      const heading = sections[i]?.heading || `${i + 1}.`;
      const seg = allSegments[i] || '';
      const block = seg ? [{ _type: 'block', children: [{ _type: 'span', text: seg }] }] : [];
      normalized.push({ heading, content: block });
    }
    return normalized;
  }

  setActive(i: number): void {
    this.activeTab.set(i);
  }

  // Helper functions for localization
  getLocalizedTitle(): string {
    const bio = this.biography();
    if (!bio) return '';
    return getLocalizedText(bio.title, this.translationService.getCurrentLanguage());
  }

  getLocalizedHeading(section: any): string {
    return getLocalizedText(section.heading, this.translationService.getCurrentLanguage());
  }

  getLocalizedContent(section: any): any[] {
    return getLocalizedContent(section.content, this.translationService.getCurrentLanguage());
  }

  getLocalizedTimelineTitle(item: any): string {
    return getLocalizedText(item.title, this.translationService.getCurrentLanguage());
  }

  getLocalizedTimelineDescription(item: any): string {
    return getLocalizedText(item.description, this.translationService.getCurrentLanguage());
  }

  getArtisticJourneyTitle(): string {
    return this.translationService.get('biography.artisticJourney');
  }

  private extractNumberedSegment(blocks: any[], targetHeading: string): string | null {
    if (!blocks || !blocks.length) return null;
    const fullText = blocks
      .map(b => (b._type === 'block' ? b.children.map((c: any) => c.text).join('') : ''))
      .join('\n\n')
      .trim();

    const numberedRegex = /\n?\s*\d+\.\s+/g;
    const matches = fullText.match(numberedRegex);
    if (!matches || matches.length < 2) return null;

    const segments = fullText.split(/(?=\n?\s*\d+\.\s+)/g).map(s => s.trim()).filter(Boolean);

    const numMatch = (targetHeading || '').match(/^(\d+)\./);
    if (numMatch) {
      const targetNum = numMatch[1];
      for (const seg of segments) {
        const m = seg.match(/^\s*(\d+)\./);
        if (m && m[1] === targetNum) {
          return seg.replace(/^\s*\d+\.\s*/, '');
        }
      }
    }

    const headingText = (targetHeading || '').replace(/^\d+\.\s*/, '').trim().toLowerCase();
    if (headingText) {
      for (const seg of segments) {
        if (seg.toLowerCase().includes(headingText)) {
          return seg.replace(new RegExp('^\\s*\\d+\\.\\s*'), '');
        }
      }
    }

    return null;
  }

  sectionHtml(section: any): string {
    // Get localized content
    const localizedContent = this.getLocalizedContent(section);
    const localizedHeading = this.getLocalizedHeading(section);

    const extracted = this.extractNumberedSegment(localizedContent || [], localizedHeading || '');
    if (extracted) {
      const paras = extracted.split(/\n\n|\n/).map(p => p.trim()).filter(Boolean);
      return paras.map(p => `<p>${p}</p>`).join('');
    }

    const html = this.portableTextToHtml(localizedContent || []);
    return html && html.trim() ? html : '<p>Brak treści. Proszę dodać zawartość tej sekcji w CMS.</p>';
  }

  portableTextToHtml(blocks: any[]): string {
    if (!blocks) return '';
    return blocks
      .map(block => {
        if (block._type === 'block') {
          return `<p>${block.children.map((child: any) => child.text).join('')}</p>`;
        }
        return '';
      })
      .join('');
  }
}
