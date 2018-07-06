import { Component, OnInit } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService} from '../model/image-model.service';

import { ObserverService} from '../common/observer.service';
import { delay } from 'q';

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
    (tag)=>{this.imageModelService.addTag(this.images[this.showIndex].id,tag).subscribe(() => {
      this.observerService.fireEvent('complete!');
    })}
    )}
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
