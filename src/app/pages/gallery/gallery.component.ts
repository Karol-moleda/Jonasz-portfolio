import { Component, signal, OnInit, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { SanityService } from '../../services/sanity.service';
import { Gallery } from '../../models/galerry';
import { getLocalizedText } from '../../utils/translation.utils';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {
  galleries = signal<Gallery[]>([]);
  activeTab = signal<string>('');
  activeGallery = computed(() =>
    this.galleries().find((g) => g._id === this.activeTab())
  );

  // Modern lightbox state
  isLightboxOpen = signal<boolean>(false);
  currentImageIndex = signal<number>(0);
  currentImages = signal<any[]>([]);
  
  // Computed for current image
  currentImage = computed(() => {
    const images = this.currentImages();
    const index = this.currentImageIndex();
    return images[index] || null;
  });

  constructor(
    private translationService: TranslationService,
    private sanityService: SanityService
  ) {}

  ngOnInit(): void {
    this.sanityService.getGalleries().subscribe((data) => {
      console.log('Fetched galleries:', data);
      this.galleries.set(data);

      if (data.length > 0) {
        this.activeTab.set(data[0]._id);
      }
    });
  }

  setActiveTab(galleryId: string): void {
    this.activeTab.set(galleryId);
  }

  openLightbox(index: number): void {
    const gallery = this.activeGallery();
    if (gallery && gallery.photos) {
      this.currentImages.set(gallery.photos);
      this.currentImageIndex.set(index);
      this.isLightboxOpen.set(true);
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
    this.currentImages.set([]);
    this.currentImageIndex.set(0);
    document.body.style.overflow = 'auto';
  }

  nextImage(): void {
    const images = this.currentImages();
    const currentIndex = this.currentImageIndex();
    if (currentIndex < images.length - 1) {
      this.currentImageIndex.set(currentIndex + 1);
    }
  }

  prevImage(): void {
    const currentIndex = this.currentImageIndex();
    if (currentIndex > 0) {
      this.currentImageIndex.set(currentIndex - 1);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isLightboxOpen()) {
      switch (event.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
        case 'ArrowLeft':
          this.prevImage();
          break;
      }
    }
  }

  getTranslation(key: string): string {
    return this.translationService.get(key);
  }

  getLocalizedTitle(gallery: Gallery): string {
    return getLocalizedText(gallery.title, this.translationService.getCurrentLanguage());
  }
}
