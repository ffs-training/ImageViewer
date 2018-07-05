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

  private imageModelArray: Array<ImageModel>;
  private index: number = 0;
  private isLeft: boolean;
  private isRight: boolean;

  constructor(private imageModelService: ImageModelService) {
    this.imageModelArray = new Array<ImageModel>();
    this.ngOnInit();
    this.isLeft = true;
    this.isRight = false;
  }

  ngOnInit() {
    this.imageModelService.fetch().subscribe(
      (images) => { 
        this.imageModelArray = images;
        console.log(this.imageModelArray);
      }      
    )   
  }

  onRightClick()
  {
    if(this.index === this.imageModelArray.length - 1){
      this.isRight = true;
    }else{
      this.index++;
      this.isRight = false;
    }
    
  }

  onLeftClick()
  {
    if(this.index === 0){
      this.isLeft = true;
    }else{
      this.index--;
      this.isLeft = false;
    }
  }
}
