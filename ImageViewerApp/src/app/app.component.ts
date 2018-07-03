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

  constructor() {}

  ngOnInit() {
    this.isLoading = false;
  }
}