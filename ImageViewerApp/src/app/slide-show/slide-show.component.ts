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

  constructor(private imagemodelservice: ImageModelService) { }

  //false(0) or true(1)
  showIndex = 0;
  images: ImageModel[];//画像が入る配列
  //メソッド
  ngOnInit() {

    //fetchを呼ぶ  //非同期
    this.images = [];
    this.imagemodelservice.fetch().subscribe(
      (data) => {
        this.images = data;
      });
  }

  //右ボタンに関する実装
  RightClick(event) {
    if (this.images.length - 1 == this.showIndex) {
      this.showIndex = 0;
    }

    else {
      this.showIndex += 1;
    }
  }

  //左ボタンに関する実装
  LeftClick(event) {
    if (0 == this.showIndex) {
      this.showIndex = this.images.length - 1;
    }

    else {
      this.showIndex -= 1;
    }
  }
}
