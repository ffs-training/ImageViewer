import { Component, OnInit } from '@angular/core';
import { ObserverService} from '../common/observer.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  private input :string;

  constructor(private observerService: ObserverService) { 
    this.input = '';
  }

  ngOnInit() {
  }

  onPut(event){
    //イベント発火
    //addtagイベント
    this.observerService.fireEvent('addtag');
    //updateイベント
    this.observerService.fireEvent('update',this.input);

  }
}
