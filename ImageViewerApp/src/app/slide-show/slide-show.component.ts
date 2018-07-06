import { Component, OnInit, Input } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService } from '../model/image-model.service';

import { ObserverService } from '../common/observer.service';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  slideimages: ImageModel[] = new Array<ImageModel>();
  imageIndex: number;
  imageNumber: number;
  rightMoveEnable: boolean;
  leftMoveEnable: boolean;

  constructor(private imageModelService: ImageModelService,
    private ovserverService: ObserverService) {
    this.imageIndex = 0;
    this.imageNumber = length;
    this.rightMoveEnable = false;
    this.leftMoveEnable = true;
  }

  Onrightslide(event) {
    this.imageIndex++;
    if (this.imageIndex >= 0 && this.imageIndex < this.imageNumber) {
      this.rightMoveEnable = false;
    }
    else {
      this.rightMoveEnable = true;
    }
  }
  Onleftslide(event) {
    this.imageIndex--;
    if (this.imageIndex > 0 && this.imageIndex <= this.imageNumber) {
      this.leftMoveEnable = false;
    }
    else {
      this.leftMoveEnable = true;
    }
  }

  ngOnInit() {
    this.imageModelService.fetch().subscribe(
      (images) => {
        this.slideimages = images;
      }
    );

    //ここでイベントが発生したら、image-model.serviceのupdateTagを呼ぶ
    this.ovserverService.addEventLister('addTagEvent!', this, (tag) => {
      this.imageModelService.addTag(this.slideimages[this.imageIndex].id, tag).subscribe();
    });

  }

}
