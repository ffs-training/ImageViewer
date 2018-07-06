import { Component, OnInit } from '@angular/core';
import { ObserverService} from '../common/observer.service';
import { ServerService } from '../common/server.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  

  constructor(private observerservice: ObserverService) { }

  ngOnInit() {
    
  }

  tag = '';
  addtag(event){
    
    this.observerservice.fireEvent("addtag",this.tag)

  }

}
