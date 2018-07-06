import { Component, OnInit } from '@angular/core';
import { ObserverService} from '../common/observer.service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
tag ='';
  constructor(private observerService: ObserverService) { }

  ngOnInit() {
  }

  public addtag() {
    console.log('tag');
    this.observerService.fireEvent('addTag',this.tag);
  }

}
