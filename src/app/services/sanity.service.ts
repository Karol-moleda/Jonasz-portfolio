import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Gallery} from '../models/galerry';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private projectId = 'ituyeb7l';
  private dataset = 'jonasz';
  private apiVersion = 'v2023-08-01';

  private baseUrl = `https://${this.projectId}.api.sanity.io/${this.apiVersion}/data/query/${this.dataset}`;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any> {
    const query = encodeURIComponent(`
      *[_type == "article"]{
        title{pl, en, it},
        publication,
        location,
        date,
        author,
        url,
        mainImage{
          asset->{
            url
          },
          alt,
          caption
        }
      }
    `);

    return this.http.get<any>(`${this.baseUrl}?query=${query}`);
  }

  getBiography(): Observable<any> {
    const query = encodeURIComponent(`
    *[_type == "biography"][0]{
    title{pl, en, it},
    heroImage{
      asset->{
        url
      },
      alt
    },
    sections[]{
      heading{pl, en, it},
      content{pl, en, it}
    },
    timeline[]{
      date,
      title{pl, en, it},
      description{pl, en, it}
    }
  }
    `);

    return this.http.get<any>(`${this.baseUrl}?query=${query}`);
  }

  getRecording(): Observable<any> {
    const query = encodeURIComponent(`
    *[_type == "recording"] | order(date desc) {
  title{pl, en, it},
  description{pl, en, it},
  date,
  status,
  videoUrl,
  thumbnail{
    asset->{url},
    alt
  },
  tags
}
    `);

    return this.http.get<any>(`${this.baseUrl}?query=${query}`);
  }

  getGalleries(): Observable<Gallery[]> {
    const query = encodeURIComponent(`
      *[_type == "gallery"]{
        _id,
        title{pl, en, it},
        location,
        date,
        description,
        photos[]{
          alt,
          author,
          asset->{url}
        }
      } | order(date desc)
    `);

    return this.http
      .get<{ result: Gallery[] }>(`${this.baseUrl}?query=${query}`)
      .pipe(map((res) => res.result));
  }

  getGalleriesByLocation(): Observable<Record<string, Gallery[]>> {
    return this.getGalleries().pipe(
      map((galleries) => {
        return galleries.reduce((acc, gallery) => {
          if (!acc[gallery.location]) {
            acc[gallery.location] = [];
          }
          acc[gallery.location].push(gallery);
          return acc;
        }, {} as Record<string, Gallery[]>);
      })
    );
  }

getConcerts(): Observable<any[]> {
  const query = encodeURIComponent(`
    *[_type == "concert"] | order(date asc) {
      title{pl, en, it},
      date,
      time,
      location{pl, en, it},
      venue{pl, en, it},
      program{pl, en, it},
      ticketLink,
      images[]{
        asset->{ url }
      }
    }
  `);

  return this.http
    .get<{ result: any[] }>(`${this.baseUrl}?query=${query}`)
    .pipe(map((res) => res.result));
}


}
