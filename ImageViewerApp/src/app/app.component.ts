import { Component, OnInit } from '@angular/core';
import { ObserverService } from './common/observer.service';
import { ServerService } from './common/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    // 一つのインスタンスを使いまわす
    { provide: ObserverService, useClass: ObserverService },
    { provide: ServerService, useClass: ServerService }
  ]
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private observerService: ObserverService) {}

  ngOnInit() {
    this.isLoading = false;

    // loading開始
    // タグ追加イベントを受け取る
    this.observerService.addEventLister("addTagEvent", this, (tag) => {
      console.log("タグ更新開始");
      this.isLoading = true;
    });
    // タグ更新完了イベントを受け取る
    // loading終わり
    this.observerService.addEventLister("upDateTagEvent", this, () => {
      console.log("タグ更新完了");
      this.isLoading = false;
    });
  }
}