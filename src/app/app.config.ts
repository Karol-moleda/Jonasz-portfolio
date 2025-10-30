import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: true,
        counter: true,
        gestures: true,
        imageSize: 'contain',
        thumbImageSize: 'cover'
      } as GalleryConfig
    }
  ]
}; 