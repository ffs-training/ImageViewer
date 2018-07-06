import { Component, OnInit } from '@angular/core';
import { ObserverService} from '../common/observer.service';

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

  addTag(event){
    //ここで、誰かにイベントが発生したことを、通知
    this.observerService.fireEvent('addTagEvent!', this.tag);

  }
}
