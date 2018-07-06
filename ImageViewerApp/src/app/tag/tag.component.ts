import { Component, OnInit, Input } from '@angular/core';
import { ObserverService} from '../common/observer.service';
import { ImageModel } from '../model/image-model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  addtag: string;

  constructor(private observerService: ObserverService) { 
    this.addtag = '';
  }

  ngOnInit() {
  }

  addTag(event){
    this.observerService.fireEvent('addTagEvent!', this.addtag);
    this.addtag = '';
  }
}
