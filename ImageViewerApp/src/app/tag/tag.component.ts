import { Component, OnInit, Input } from '@angular/core';
import { ObserverService} from '../common/observer.service';
import { ImageModel } from '../model/image-model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tag: string = "";
  constructor(private observerService: ObserverService) { }

  ngOnInit() {
  }

  addTag() {
    // タグ追加イベント
    this.observerService.fireEvent("addTagEvent", this.tag);
    console.log("addTag");
    this.tag ="";
    // slide-showコンポーネントでイベントは受け取る
    
  }
}
