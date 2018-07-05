import { Component, OnInit } from '@angular/core';
import { ObserverService} from '../common/observer.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tag: string ='';
  constructor(private observerService: ObserverService) { }

  ngOnInit() {
  }

  addTag(event){
    this.observerService.fireEvent('addTag!', this.tag);
  }
}
