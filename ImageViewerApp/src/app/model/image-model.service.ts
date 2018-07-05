import { Injectable } from '@angular/core';
import { ImageModel } from './image-model';
import { ServerService } from '../common/server.service';
import { deserialize } from 'serializer.ts/Serializer';
import { serialize } from 'serializer.ts/Serializer';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageModelService {

  constructor(private serverService: ServerService) { }

  //images: Array<ImageModel>;
  images: ImageModel[];
  
  fetch(): Observable<ImageModel[]>{
    return this.serverService.getImages().pipe(
      map(
      (images) => {
        this.images = images.map((image) => this.deserialize(image))
        return this.images ; 
      }),
         catchError(error => of(error))
        )
        //return of(this.images);
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
