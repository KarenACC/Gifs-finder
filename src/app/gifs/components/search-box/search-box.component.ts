import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  constructor(public gifsService:GifsService){}

  @ViewChild('searchInput')
  public myInput!: ElementRef<HTMLInputElement>


  search(){
    const newTag= this.myInput.nativeElement.value
    if(!newTag) return;
    console.log({newTag});
    this.gifsService.searchTag(newTag)
    this.myInput.nativeElement.value='';
  };
}
