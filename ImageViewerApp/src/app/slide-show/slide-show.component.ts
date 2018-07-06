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
  showindex: number;
  leftbutton: boolean;
  rightbutton: boolean;
  private images: Array<ImageModel>;

  constructor(private imageModelService: ImageModelService, private observerService: ObserverService) {
    this.images = [];
    this.showindex = 0;
    this.leftbutton = true;
    this.rightbutton = false;
  }

  ngOnInit() {
    //イメージ情報をfetchで取得
    this.imageModelService.fetch().subscribe(
      images => {
        this.images = images;
      }
    );

    //追加Tag情報はtag.componentから受け取る
    this.observerService.addEventLister('addTagEvent!', this,
      (tag) => {
        this.imageModelService.addTag(this.images[this.showindex].id, tag).subscribe(
          () => {
            this.observerService.fireEvent('updateOver');
          }
        )
      }
    );
  }

  //前の画像を表示するボタンをクリックした場合
  leftButtonClick(event) {
    if (this.showindex > 0) {
      this.showindex--;
      if (this.showindex == 0) this.leftbutton = true;
      else this.leftbutton = false;
      this.rightbutton = false;
    }
  }

  //次の画像を表示するボタンをクリックした場合
  rightButtonClick(event) {
    if (this.showindex < this.images.length - 1) {
      this.showindex++;
      if (this.showindex == this.images.length - 1) this.rightbutton = true;
      else this.rightbutton = false;
      this.leftbutton = false;
    }
  }
}