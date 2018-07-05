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
  images:ImageModel[];
  showIndex:number = 0;
  constructor(private imageModelService:ImageModelService,
    private observerService:ObserverService) {
   }
  
  ngOnInit() {
    this.imageModelService.fetch().subscribe(image => this.images = image);
    this.observerService.addEventLister('addTagEvent!',this,
    (tag)=>{this.images[this.showIndex].tags+tag;});
  }
  incrementer(event){
    if(this.images.length-1>this.showIndex){
    this.showIndex++;
    }
  }

  decrementer(event){
    if(this.showIndex>0){
    this.showIndex--;
    }
  }

}
