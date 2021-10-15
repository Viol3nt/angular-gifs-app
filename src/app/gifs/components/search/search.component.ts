import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  @ViewChild('searchBar') searchBar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  search(): void {
    const value = this.searchBar.nativeElement.value;
    if (value.trim().length === 0) return;
    this.gifsService.searchGifs(value);
    this.searchBar.nativeElement.value = '';
  }
}
