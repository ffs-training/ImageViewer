import { Component, OnInit } from '@angular/core';
import { ObserverService } from './common/observer.service';
import { ServerService } from './common/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: ObserverService, useClass: ObserverService },
    { provide: ServerService, useClass: ServerService }
  ]
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private observerService: ObserverService) {}

  ngOnInit() {
    this.isLoading = false;
    
    //addtagイベント設定(updateイベントに追加する形は気持ち悪く感じました)
    this.observerService.addEventLister('addtag',this, () => {
      this.isLoading = true;
    });

    //completeイベント設定
    this.observerService.addEventLister('complete',this, () =>{
      this.isLoading = false;
    });
  }
}