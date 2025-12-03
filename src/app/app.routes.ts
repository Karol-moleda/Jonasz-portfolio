import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BiographyComponent } from './pages/biography/biography.component';
import { ConcertsComponent } from './pages/concerts/concerts.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { RecordingsComponent } from './pages/recordings/recordings.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    data: {
      title: 'Jonasz Jochemczyk - Pianista • Artysta',
      description: 'Oficjalna strona pianisty Jonasza Jochemczyka. Najnowsze informacje, koncerty i osiągnięcia.'
    }
  },
  { 
    path: 'biography', 
    component: BiographyComponent,
    data: {
      title: 'Biografia - Jonasz Jochemczyk',
      description: 'Poznaj życiorys i drogę artystyczną pianisty Jonasza Jochemczyka. Edukacja, nagrody i doświadczenie.'
    }
  },
  { 
    path: 'concerts', 
    component: ConcertsComponent,
    data: {
      title: 'Koncerty - Jonasz Jochemczyk',
      description: 'Sprawdź nadchodzące koncerty i wydarzenia muzyczne z udziałem Jonasza Jochemczyka.'
    }
  },
  { 
    path: 'articles', 
    component: ArticlesComponent,
    data: {
      title: 'Artykuły - Jonasz Jochemczyk',
      description: 'Zbiór artykułów, recenzji i publikacji dotyczących działalności artystycznej Jonasza Jochemczyka.'
    }
  },
  { 
    path: 'gallery', 
    component: GalleryComponent,
    data: {
      title: 'Galeria - Jonasz Jochemczyk',
      description: 'Zdjęcia z koncertów, sesji zdjęciowych i wydarzeń artystycznych Jonasza Jochemczyka.'
    }
  },
  { 
    path: 'recordings', 
    component: RecordingsComponent,
    data: {
      title: 'Nagrania - Jonasz Jochemczyk',
      description: 'Posłuchaj nagrań audio i wideo z występów pianisty Jonasza Jochemczyka.'
    }
  },
  { 
    path: 'contact', 
    component: ContactComponent,
    data: {
      title: 'Kontakt - Jonasz Jochemczyk',
      description: 'Skontaktuj się z Jonaszem Jochemczykiem w sprawie koncertów, współpracy lub lekcji.'
    }
  },
  { path: '**', redirectTo: '' }
]; 