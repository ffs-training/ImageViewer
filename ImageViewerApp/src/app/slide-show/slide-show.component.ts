import { Component, OnInit } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService} from '../model/image-model.service';

import { ObserverService } from '../common/observer.service';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  images: ImageModel[];
  showIndex = 0;
  constructor(
    private imageModelService: ImageModelService,
    private observerService: ObserverService) { }

  ngOnInit() {
    this.imageModelService.fetch().subscribe(
      (images) => {
        this.images = images;
      }
    );

    this.observerService
    .addEventLister('addTagEvent!', this, (tag) => {
      //this.images[this.showIndex];
    });
  }

  right() {
    this.showIndex++;
  }
}
