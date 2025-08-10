import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Concert } from '../models/concert';
import { Article } from '../models/article';
import { Recording } from '../models/recording';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getUpcomingConcerts(): Observable<Concert[]> {
    const concerts: Concert[] = [
      {
        id: '1',
        title: 'Recital Chopinowski',
        date: '2024-12-15',
        time: '19:00',
        location: 'Warszawa',
        venue: 'Filharmonia Narodowa',
        program: 'Fryderyk Chopin - Ballady, Nokturny, Polonezy',
        poster: 'assets/images/concert-1.jpg',
        ticketLink: 'https://filharmonia.pl',
        isUpcoming: true
      },
      {
        id: '2',
        title: 'Koncert z Orkiestrą',
        date: '2024-12-22',
        time: '20:00',
        location: 'Kraków',
        venue: 'Krakowska Filharmonia',
        program: 'Beethoven - Koncert fortepianowy nr 5 "Cesarski"',
        poster: 'assets/images/concert-2.jpg',
        ticketLink: 'https://filharmonia.krakow.pl',
        isUpcoming: true
      },
      {
        id: '3',
        title: 'Wieczór Liszta',
        date: '2025-01-10',
        time: '18:30',
        location: 'Poznań',
        venue: 'Aula Nova',
        program: 'Ferenc Liszt - Rapsodie węgierskie, Sonata h-moll',
        poster: 'assets/images/concert-3.jpg',
        ticketLink: 'https://aulanova.pl',
        isUpcoming: true
      }
    ];
    return of(concerts);
  }

  getPastConcerts(): Observable<Concert[]> {
    const concerts: Concert[] = [
      {
        id: '4',
        title: 'Recital w Olkuszu',
        date: '2024-11-20',
        location: 'Olkusz',
        venue: 'Miejski Ośrodek Kultury',
        program: 'Diverse Piano Works',
        poster: 'assets/images/concert-4.jpg',
        isUpcoming: false,
        images: ['assets/images/concert-4-1.jpg', 'assets/images/concert-4-2.jpg']
      },
      {
        id: '5',
        title: 'Koncert w Katowicach',
        date: '2024-10-15',
        location: 'Katowice',
        venue: 'NOSPR',
        program: 'Rachmaninoff - Koncerty fortepianowe',
        poster: 'assets/images/concert-5.jpg',
        isUpcoming: false,
        images: ['assets/images/concert-5-1.jpg']
      }
    ];
    return of(concerts);
  }

  getArticles(): Observable<Article[]> {
    const articles: Article[] = [
      {
        id: '1',
        title: 'Jonasz Jochymczyk - nowa gwiazda fortepianu',
        excerpt: 'Młody pianista z Olkusza zachwyca publiczność swoją interpretacją dzieł Chopina...',
        source: 'Rzeczpospolita',
        sourceUrl: 'https://rzeczpospolita.pl',
        image: 'assets/images/article-1.jpg',
        date: '2024-11-15',
        author: 'Anna Kowalska'
      },
      {
        id: '2',
        title: 'Technika i wrażliwość - recital Jonasza Jochymczyka',
        excerpt: 'W Filharmonii Narodowej odbył się recital młodego pianisty, który pokazał...',
        source: 'Gazeta Wyborcza',
        sourceUrl: 'https://wyborcza.pl',
        image: 'assets/images/article-2.jpg',
        date: '2024-10-20',
        author: 'Piotr Nowak'
      },
      {
        id: '3',
        title: 'Od Olkusza do światowych scen',
        excerpt: 'Historia Jonasza Jochymczyka to przykład, jak talent i ciężka praca...',
        source: 'Polityka',
        sourceUrl: 'https://polityka.pl',
        image: 'assets/images/article-3.jpg',
        date: '2024-09-10',
        author: 'Maria Wiśniewska'
      }
    ];
    return of(articles);
  }

  getRecordings(): Observable<Recording[]> {
    const recordings: Recording[] = [
      {
        id: '1',
        title: 'Chopin - Ballada g-moll op. 23',
        composer: 'Fryderyk Chopin',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '9:45',
        year: 2024,
        description: 'Interpretacja Ballady g-moll Fryderyka Chopina'
      },
      {
        id: '2',
        title: 'Beethoven - Sonata "Księżycowa"',
        composer: 'Ludwig van Beethoven',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '15:30',
        year: 2024,
        description: 'Sonata cis-moll op. 27 nr 2 "Księżycowa"'
      },
      {
        id: '3',
        title: 'Liszt - Rapsodia węgierska nr 2',
        composer: 'Ferenc Liszt',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '10:15',
        year: 2023,
        description: 'Wirtuozowska interpretacja Rapsodii węgierskiej'
      },
      {
        id: '4',
        title: 'Rachmaninoff - Preludium cis-moll',
        composer: 'Sergei Rachmaninoff',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '4:20',
        year: 2023,
        description: 'Preludium op. 3 nr 2 w interpretacji Jonasza'
      },
      {
        id: '5',
        title: 'Debussy - Clair de Lune',
        composer: 'Claude Debussy',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '5:45',
        year: 2024,
        description: 'Poetycka interpretacja Clair de Lune'
      }
    ];
    return of(recordings);
  }
} 