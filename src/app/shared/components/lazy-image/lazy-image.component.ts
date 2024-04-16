import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent {

  @Input()
  public url!:string;

  @Input()
  public alt:string = '';

  public hasLoaded:boolean = false;

  onLoad(){
    this.hasLoaded=true;
  }
}
