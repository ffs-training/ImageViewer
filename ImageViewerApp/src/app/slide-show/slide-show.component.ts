import { Component, OnInit } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService } from '../model/image-model.service';

import { ObserverService } from '../common/observer.service';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  images: ImageModel[];
  showIndex = 0;
  tag: string;
  constructor(private imageModelService: ImageModelService,private observerService:ObserverService) {
    this.imageModelService.fetch();
  }

  ngOnInit() {
    this.imageModelService.fetch().subscribe(
      (images) => { this.images = images }
    );
    this.observerService.addEventLister('addTagEvent!',this,
    (tagtext)=>{
      // this.images[this.showIndex].addTag(tagtext);
      this.imageModelService.addTag(this.images[this.showIndex].id,tagtext);
      }
  );
  }
  onLeft(event) {
    if (this.showIndex > 0) {
      this.showIndex--;
    }
  }
  onRight(event) {
    if (this.showIndex < this.images.length - 1) {
      this.showIndex++;
    }
  }
}
