import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = '58TTDOzzke6FglQ3BNfb2d3StPi3oyq0';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) { this.loadLocalStorage(), this.searchTag(this._tagsHistory[0]) }

  get tagsHistory(){
    return [...this._tagsHistory];
  };

  organizeHistory(tag:string):void{
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory.splice(10,1)
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  };

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
  }

  searchTag(tag:string):void{
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceURL}/search`, {params})
    .subscribe(resp => {
      this.gifsList = resp.data
      
    })
  };



  }
  

