import { Component, OnInit, Input } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService} from '../model/image-model.service';

import { ObserverService} from '../common/observer.service';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  slideimages:ImageModel[] = new Array<ImageModel>();
  imageIndex:number ;
  imageNumber:number;
  rightMoveEnable:boolean;
  leftMoveEnable:boolean;

  constructor(private imageModelService:ImageModelService) {
    this.imageIndex = 0;
    this.imageNumber = length;
    this.rightMoveEnable =true;
    this.leftMoveEnable = false;
   }

  Onrightslide(event){
    this.imageIndex +=1;
    if( this.imageIndex >= 0 && this.imageIndex  < this.imageNumber){
      this.rightMoveEnable = true;
    }
    else {
      this.rightMoveEnable = false;
    }
  }
  Onleftslide(event){
    this.imageIndex -=1;
    if(  this.imageIndex  > 0 && this.imageIndex <= this.imageNumber ){
      this.leftMoveEnable = true;
    }
    else {
      this.leftMoveEnable = false;
    }

  }
  ngOnInit() {
    this.imageModelService.fetch().subscribe( 
      images =>{
        this.slideimages = images;
      }
    )
  }
}
