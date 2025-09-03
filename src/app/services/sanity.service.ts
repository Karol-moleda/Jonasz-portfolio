import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        title,
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
    title,
    heroImage{
      asset->{
        url
      },
      alt
    },
    sections[]{
      heading,
      content
    },
    timeline[]{
      date,
      title,
      description
    }
  }
    `);

    return this.http.get<any>(`${this.baseUrl}?query=${query}`);
  }
}
