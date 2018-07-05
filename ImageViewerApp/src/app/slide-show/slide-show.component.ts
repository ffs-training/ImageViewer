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

  index: number;

  isleft: boolean;
  isright: boolean;

  constructor(private imageModelService :ImageModelService) { 
    this.index = 0;
    this.isleft = true;
    this.isright = false;
  }

  ngOnInit() {
    this.imageModelService.fetch().subscribe(
      (data) =>{
        this.items = data;
      }
    );
  }

  onright(event){
    if(this.index < this.items.length-1){ //ここまではindex=8まで受け入れ
      this.index++; //index=9になる
      this.isleft = false;
    }
    if(this.index === this.items.length-1){ //index=9ならば
      this.isright=true;
    }
  }
  
  onleft(event){
    if(this.index > 0){ //ここまではindex=1まで受け入れ
      this.index--;　//index=0になる
      this.isright = false;
    }
    if(this.index === 0){　//index=0ならば
      this.isleft=true;
    }
  }

}
