import { Component, OnInit } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService} from '../model/image-model.service';

import { ObserverService} from '../common/observer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  images :ImageModel[];
  index :number=0;

  constructor(private imageModelService : ImageModelService) { 
  }

  ngOnInit() {
     this.imageModelService.fetch().subscribe(
       (images) => {
         this.images = images;
       }
     )
  }

  add(event) {
    if (this.index < this.images.length-1) {
      this.index++;
    }
  }
  sub(event) {
    if (this.index > 0) {
      this.index--;
    }
  }
}

