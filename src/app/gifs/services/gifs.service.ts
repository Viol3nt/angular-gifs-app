import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey: string = 'X39214unRW2XstFXxh4nIyNc237Tjw3n';
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history(): string[] {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!);
    this.results = JSON.parse(localStorage.getItem('lastSearch')!);
  }

  searchGifs(query: string = '') {
    query = query.toLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '15')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.urlService}/search`, { params })
      .subscribe((res) => {
        this.results = res.data;
        localStorage.setItem('lastSearch', JSON.stringify(this.results));
      });
  }
}
