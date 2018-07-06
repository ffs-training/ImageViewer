import { Component, OnInit } from '@angular/core';
import { ObserverService} from '../common/observer.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tag = '';
  
  constructor(private observerService:ObserverService) { }
  ngOnInit() {
  }

  addTag(event){
    this.observerService.fireEvent('addTagEvent!',this.tag);
  } 
}
