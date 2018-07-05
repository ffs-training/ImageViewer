import { Injectable } from '@angular/core';
import { ImageModel } from './image-model';
import { ServerService } from '../common/server.service';
import { deserialize } from 'serializer.ts/Serializer';
import { serialize } from 'serializer.ts/Serializer';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageModelService {
  private images: ImageModel[];

  constructor(private serverService: ServerService) { }

  fetch(): Observable<ImageModel[]> {
    return this.serverService.getImages()
    .pipe(
      map( (anyObjects) => {
        // this.images = anyObjects.map((anyObject) => {

        // });
        this.images = [];
        anyObjects.forEach((anyObject) => {
        this.images.push(this.deserialize(anyObject));
        });
      return this.images;
      })
    );
  }

addTag(id: number, tag: string) {
  // idの一致するimageをみつける
  // const image = this.images.find( (img) => {
  //   return img.id === id;
  // });
  // image.addTag(tag);

this.images.forEach((img) => {
  if (img.id === id) {
    img.addTag(tag);
  }
});

this.serverService.updateImage();

}

  private deserialize(anyObject: any): ImageModel {
    return  deserialize<ImageModel>(ImageModel, {
      id: anyObject.Id,
      path: anyObject.Path,
      tags: anyObject.Tags
  
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
