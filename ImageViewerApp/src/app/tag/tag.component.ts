import { Component, OnInit } from '@angular/core';
import { ObserverService} from '../common/observer.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tagtext = '';
  constructor(private observerService:ObserverService) { }
  onAdd(event){
    this.observerService.fireEvent('addTagEvent!',this.tagtext);
    this.tagtext;
  }
  ngOnInit() {
  }
}
