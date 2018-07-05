import { Injectable } from '@angular/core';
import { ImageModel } from './image-model';
import { ServerService } from '../common/server.service';
import { deserialize } from 'serializer.ts/Serializer';
import { serialize } from 'serializer.ts/Serializer';
import { map, tap } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageModelService {

  constructor(private serverService: ServerService) { }

  images: Array<ImageModel>;

  fetch(): Observable<ImageModel[]> {
    // return this.serverService.getImages().pipe(
    //   map((anyObject) => {
    //     anyObject.forEach((object) => { this.images.push(this.deserialize(object)) });
    //     return this.images;
    //   })

    // );

    this.images = [];
    return this.serverService.getImages().pipe(
      map((anyObject) => {
        anyObject.map((image) => {
          this.images.push(
            this.deserialize(image)
          );
        })
        return this.images;
      })
    );

  }

  private deserialize(image: any): ImageModel {
    return deserialize<ImageModel>(ImageModel, {
      id: image.Id,
      path: image.Path,
      tags: image.Tags
    });
  }

  private serialize(imageModel: ImageModel): string {
    return serialize({
      Id: imageModel.id,
      Path: imageModel.path,
      Tags: imageModel.tags
    });
  }
}
