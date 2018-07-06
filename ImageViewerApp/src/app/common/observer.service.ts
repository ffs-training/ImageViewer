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

  /**
   * イベント発生時に実行するコールバックを登録します
   * 使い方
   * observerService.addEventLister('testEvent!', this, (test, testtest) => console.log(test + testtest))
   * @param topic イベントの名前
   * @param caller イベントリスナーの登録者のインスタンス
   * @param callback コールバック関数
   */
  public addEventLister(topic: string, caller: any, callback: Function): void {
    if (!(topic in this.topics)) {
      this.topics[topic] = new Subject();
    }
    this.topics[topic].subscribe({
      next : (args) => callback.apply(caller, args)
    });
  }

  /**
   * イベントを発火させます
   * 使い方
   * observerService.fireEvent('testEvent!', 'test!!', 'testtest!!');
   * @param topic イベントの名前
   * @param args イベントリスナーに渡す引数
   */
  public fireEvent(topic: string, ...args: any[]): void {
    if (topic in this.topics) {
      this.topics[topic].next(args);
    }
  }
}