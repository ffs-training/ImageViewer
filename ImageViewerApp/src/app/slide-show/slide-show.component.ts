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

  items: ImageModel[];

  target_index: number;

  isleft: boolean;
  isright: boolean;

  constructor(private imageModelService :ImageModelService, 
    private observerService: ObserverService) { 
    this.target_index = 0;
    this.isleft = true;
    this.isright = false;
  }

  ngOnInit() {
    //サーバーからデータを取得（ImageModel型の配列）
    this.imageModelService.fetch().subscribe(
      (data) =>{
        this.items = data;
      }
    )
    //updateイベント設定
    this.observerService.addEventLister('update',this, (tag) => {
      
      this.imageModelService.update(this.target_index,tag).subscribe( () => {
        //updateイベントが終了したら完了イベント発火
        this.observerService.fireEvent('complete');
      });
    });
  }

  onright(event){
    if(this.target_index < this.items.length-1){ //ここまではindex=8まで受け入れ
      this.target_index++; //index=9になる
      this.isleft = false;
    }
    if(this.target_index === this.items.length-1){ //index=9ならば（前のif文でindex=9になるので、elseは適用できない)
      this.isright = true;
    }
  }
  
  onleft(event){
    if(this.target_index > 0){ //ここまではindex=1まで受け入れ
      this.target_index--;　//index=0になる
      this.isright = false;
    }
    if(this.target_index === 0){　//index=0ならば（上記と同じ）
      this.isleft = true;
    }
  }
}
