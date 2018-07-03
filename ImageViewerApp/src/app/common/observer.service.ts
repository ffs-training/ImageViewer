import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ObserverService {
  private topics: {[key: string]: Subject<any[]>};
  constructor() { 
    this.topics = {};
  }

  public addEventLister(topic: string, caller: any, callback: Function): void {
    if (!(topic in this.topics)) {
      this.topics[topic] = new Subject();
    }
    this.topics[topic].subscribe({
      next : (args) => callback.apply(caller, args)
    });
  }

  public fireEvent(topic: string, ...args: any[]): void {
    if (topic in this.topics) {
      this.topics[topic].next(args);
    }
  }
}
