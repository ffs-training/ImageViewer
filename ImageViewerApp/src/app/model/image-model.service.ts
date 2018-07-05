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
  
  images : ImageModel[];//画像が入る配列 

  constructor(private serverService: ServerService) { }

  //サーバーからデータを取ってくる
  public fetch() : Observable <ImageModel[]> {
     this.images = [];
     return this.serverService.getImages().pipe(
       map ((anyObject) => 
       {
         anyObject.forEach((object) =>
         {
            this.images.push(this.deserialize(object));
         });
         return this.images;
       }));
      
  }

  addtags(){}


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
