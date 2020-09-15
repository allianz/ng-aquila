import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  private WIKIPEDIA_URL = 'https://en.wikipedia.org/w/api.php';

  constructor(private client: HttpClient) {}

  search (term: string): Observable<any[]> {
    const url = searchUrl(term, this.WIKIPEDIA_URL);
    return this.client.jsonp(url, 'callback')
      .pipe(map((response) => response[1].map(item => {
        return {value: item};
      })));

    function searchUrl(searchTeam, base) {
      const params = new HttpParams()
        .append('action', 'opensearch')
        .append('search', encodeURIComponent(searchTeam))
        .append('format', 'json');
      return `${base}?${params.toString()}`;
    }
  }
}
