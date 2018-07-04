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

  constructor(private serverService:ServerService) { }

  images:Array<ImageModel>;

   fetch(){
     this.serverService.getImages().pipe(
       map( (anyObject) => {
      //   this.images = images.map( (image);
      //  });
   
       anyObject.forEach((object) => {
         this.images.push(this.deserialize(object));
          });
        })
      );
    //  for(i:number =0:)
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
