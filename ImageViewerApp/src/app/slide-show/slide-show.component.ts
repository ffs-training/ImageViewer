import { Component, OnInit } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService} from '../model/image-model.service';

import { ObserverService} from '../common/observer.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {

  items : ImageModel[];
  imageIndex : number;

  constructor(private imageModelService:ImageModelService,
  private observerService: ObserverService) {
    // this.imageModelService.fetch().subscribe((data) => {
    //   console.log(data); 
    //   });
    // this.imageModelService.fetch().subscribe((data)=>{
    //   this.items = data;
    //     });
    this.imageIndex = 0;
  }
   

  ngOnInit() {
    this.imageModelService.fetch().subscribe((data)=>{
      this.items = data;
        });

        this.observerService.addEventLister('addTag',this,(tag) =>{
          
          this.imageModelService.addtag(this.items[this.imageIndex].id,tag)
        });
  }


  OnClickR(){
    if(this.imageIndex < this.items.length - 1){
      this.imageIndex++;
    }
    else{
    }  
  }

  OnClickL(){
    if(this.imageIndex > 0){
      this.imageIndex--;
    }
    else{
       
    }  
  }
}