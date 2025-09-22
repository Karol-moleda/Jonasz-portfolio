import { Component, signal, OnInit, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { SanityService } from '../../services/sanity.service';
import { Gallery } from '../../models/galerry';
import { getLocalizedText } from '../../utils/translation.utils';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  galleries = signal<Gallery[]>([]);
  activeTab = signal<string>('');
  activeGallery = computed(() =>
    this.galleries().find((g) => g._id === this.activeTab())
  );

  // Modal state
  isModalOpen = signal<boolean>(false);
  currentPhoto = signal<any>(null);
  currentIndex = signal<number>(0);
  allPhotos = signal<any[]>([]);

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

  openModal(photos: any[], index: number): void {
    this.allPhotos.set(photos);
    this.currentIndex.set(index);
    this.currentPhoto.set(photos[index]);
    this.isModalOpen.set(true);
    // Blokuj scrollowanie strony gdy modal jest otwarty
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.currentPhoto.set(null);
    this.allPhotos.set([]);
    // Przywróć scrollowanie strony
    document.body.style.overflow = 'auto';
  }

  nextPhoto(): void {
    const photos = this.allPhotos();
    const currentIdx = this.currentIndex();
    if (currentIdx < photos.length - 1) {
      const newIndex = currentIdx + 1;
      this.currentIndex.set(newIndex);
      this.currentPhoto.set(photos[newIndex]);
    }
  }

  prevPhoto(): void {
    const photos = this.allPhotos();
    const currentIdx = this.currentIndex();
    if (currentIdx > 0) {
      const newIndex = currentIdx - 1;
      this.currentIndex.set(newIndex);
      this.currentPhoto.set(photos[newIndex]);
    }
  }

  // Obsługa klawiatury
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isModalOpen()) {
      switch (event.key) {
        case 'Escape':
          this.closeModal();
          break;
        case 'ArrowRight':
          this.nextPhoto();
          break;
        case 'ArrowLeft':
          this.prevPhoto();
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
