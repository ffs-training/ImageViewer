import { Component, OnInit } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService } from '../model/image-model.service';

import { ObserverService } from '../common/observer.service';
import { ServerService } from '../common/server.service';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  private images: ImageModel[];
  private viewImage: ImageModel;
  private index: number = 0;
  private maxIndex;
  private isLeftDisabled: boolean;
  private isRightDisabled: boolean;
  //private showIndex: number;

  constructor(private imageModelService: ImageModelService) { }

  ngOnInit() {
    // fetchをよぶ
    // fetchが終わってから処理をする
    this.imageModelService.fetch().subscribe(
      (images) => {
        console.log(images); // ここでブレークポイントを貼る
        // リストに入れる
        this.images = images;
        // リストの最大値を格納
        this.maxIndex = images.length;
        console.log(this.maxIndex);
        // 表示する画像を格納
        this.viewImage = images[0];
        this.isLeftDisabled = true;
        this.isRightDisabled = false;
      });
  }

  // 右ボタンを呼ばれたときのイベント
  onClickedRightButton() {
    if (this.index < this.maxIndex-1) {
      this.index++;
      this.viewImage = this.images[this.index];
      this.isLeftDisabled = false;
      if (this.index == this.maxIndex-1)
        this.isRightDisabled = true;
    }
  }

  // 左ボタンを呼ばれたときのイベント
  onClickedLeftButton() {
    if (this.index > 0) {
      this.index--;
      this.viewImage = this.images[this.index];
      this.isRightDisabled = false;
      if (this.index == 0)
        this.isLeftDisabled = true;
    }
  }
}
  