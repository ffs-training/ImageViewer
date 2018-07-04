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

  imageModelArray: Array<ImageModel>;
  constructor(private imageModelService: ImageModelService) {
    this.imageModelArray = new Array<ImageModel>();
  }

  ngOnInit() {
    this.imageModelService.fetch().subscribe(
      (image) => { 
        this.imageModelArray.push(image);
        console.log(image);
      }      
    )   
  }
}
