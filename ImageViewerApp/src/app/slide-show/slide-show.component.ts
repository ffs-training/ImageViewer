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


  constructor(private imagemodelservice: ImageModelService) { }

  //images: Observable<ImageModel[]>;
  images: ImageModel[];

showIndex = 0;
maxIndex;
minIndex = 0;


  onLeft(event){
    if(this.showIndex !== this.maxIndex)
      this.showIndex++;
  }

  onRight(event){
    if(this.showIndex !== 0)
    this.showIndex--;
}

  ngOnInit() {

    //this.images = this.imagemodelservice.fetch();
    this.imagemodelservice.fetch().subscribe((images)=>{
      this.images = images
      this.maxIndex =  this.images.length -1
    })

  }
}

