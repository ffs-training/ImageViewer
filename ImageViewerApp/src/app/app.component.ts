import { Component, OnInit } from '@angular/core';
import { ObserverService } from './common/observer.service';
import { ServerService } from './common/server.service';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';

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

  constructor(private observerService: ObserverService) { }

  ngOnInit() {
    this.isLoading = false;
    this.observerService.addEventLister('addTagEvent!', this,
      (tagtext) => {
        this.isLoading = true
      });
    this.observerService.addEventLister('Complete!', this,
      (nulltext) => {    
        setTimeout(() => {
          this.isLoading = false
        }, 1000);
      });
  }
}