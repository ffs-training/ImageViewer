import { Component, OnInit } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService} from '../model/image-model.service';

import { ObserverService} from '../common/observer.service';
import { ServerService } from '../common/server.service';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  images: ImageModel[];
  constructor(private imageModelService: ImageModelService) { }

  ngOnInit() {
    // fetchをよぶ
    // fetchが終わってから処理をする
      this.imageModelService.fetch().subscribe(
      (data) => {
        console.log(data); // ここでブレークポイントを貼る
        this.images = data;
      });
  }
}
