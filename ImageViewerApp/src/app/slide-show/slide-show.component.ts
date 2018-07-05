import { Component, OnInit } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService} from '../model/image-model.service';

import { ObserverService} from '../common/observer.service';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  showindex: number;
  leftbutton:boolean;
  rightbutton:boolean;
  private images: Array<ImageModel>;

  constructor(private imageModelService: ImageModelService) {
    this.images = [];
    this.showindex = 0;
    this.leftbutton = false;
    this.rightbutton = true;
   }

  ngOnInit() {
    this.imageModelService.fetch().subscribe(
      images => {
        this.images = images;
      }
    );
  }

  leftButtonClick(event){
    if(this.showindex > 0){
      this.showindex--;
      if(this.showindex == 0) this.leftbutton = false;
      else this.leftbutton = true;
      this.rightbutton = true;
    }
  }

  rightButtonClick(event){
    if(this.showindex < this.images.length-1){
      this.showindex++;
      if(this.showindex == this.images.length-1) this.rightbutton = false;
      else this.rightbutton = true;
      this.leftbutton = true;
    }
  }
}