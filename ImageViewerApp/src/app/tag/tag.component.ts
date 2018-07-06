import { Component, OnInit } from '@angular/core';
import { ObserverService} from '../common/observer.service';
import { ImageModel } from '../model/image-model';
import { ServerService } from '../common/server.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tag:string;

  constructor(private observerService:ObserverService) { 
    this.tag = '';
  }

  ngOnInit() {}

  addTag(event){
    this.observerService.fireEvent('addTagEvent', this.tag);
  

  }
}
