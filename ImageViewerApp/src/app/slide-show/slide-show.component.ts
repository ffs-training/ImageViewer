import { Component, OnInit } from '@angular/core';

import { ImageModel } from '../model/image-model';
import { ImageModelService } from '../model/image-model.service';

import { ObserverService } from '../common/observer.service';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { ServerService } from '../common/server.service';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  private images: ImageModel[];
  private imageIndex: number;
  private disableLeft: boolean;
  private disableRight: boolean;

  constructor(private imageModelService: ImageModelService, private observerService:ObserverService) {}

  ngOnInit() {
    this.imageModelService.fetch().subscribe((images) => { 
      this.images = images; 
      this.imageIndex = 0;
      this.renewButtonDisabled();
    });

    this.observerService.addEventLister('addTagEvent', this, (tag) => {
      this.imageModelService.addTag(this.images[this.imageIndex].id, tag).subscribe(() => {
        this.observerService.fireEvent('completeRenewModelEvent');
      });
    });

  }

  incrementIndex(event) {
    if (this.imageIndex < this.images.length - 1) {
      this.imageIndex++;
    }

    this.renewButtonDisabled();
  }

  decrementIndex(event) {
    if (this.imageIndex > 0) {
      this.imageIndex--;
    }

    this.renewButtonDisabled();
  }

  renewButtonDisabled() {
    this.disableLeft = (this.imageIndex <= 0);
    this.disableRight = (this.imageIndex >= this.images.length - 1);
  }
}
