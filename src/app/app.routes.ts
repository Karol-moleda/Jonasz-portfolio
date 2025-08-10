import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BiographyComponent } from './pages/biography/biography.component';
import { ConcertsComponent } from './pages/concerts/concerts.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { RecordingsComponent } from './pages/recordings/recordings.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'biography', component: BiographyComponent },
  { path: 'concerts', component: ConcertsComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'recordings', component: RecordingsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
]; 