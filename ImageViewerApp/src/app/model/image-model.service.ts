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
  images : ImageModel[];
  constructor(private serverService : ServerService) { }

  fetch(){
    // this.serverService.getImages().pipe(
    //   map((images) => {
    //     this.images = images.map((image) =>{

    //     });
    //   })
    // );
    this.serverService.getImages().forEach(
      (serverImage) => {this.images.push(this.deserialize(serverImage))}
    )
  }

  private deserialize(image:any):ImageModel {
    return  deserialize<ImageModel>(ImageModel, {
      id: image.Id,
      path: image.Path,
      tags: image.Tags
    });
  }

  private serialize(imageModel:ImageModel):string {
    return serialize({
      Id:imageModel.id,
      Path:imageModel.path,
      Tags:imageModel.tags
    });
  }
}
