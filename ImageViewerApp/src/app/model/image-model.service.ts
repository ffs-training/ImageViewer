import { Injectable } from '@angular/core';
import { ImageModel } from './image-model';
import { ServerService } from '../common/server.service';
import { deserialize } from 'serializer.ts/Serializer';
import { serialize } from 'serializer.ts/Serializer';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable,of, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageModelService {
  images: ImageModel[];

  constructor(private serverService: ServerService) { }

  fetch(): Observable<any>{
    this.images = [];
    return this.serverService.getImages().pipe(map((data)=>{
      //console.log(data)
      data.forEach((data)=>{this.images.push(this.deserialize(data));});
      return this.images;
      //console.log(this.images);
      //ここで取ってきたimagesを1つずつany型からImageModel型に変換（deserialize()）してthis.imagesに格納
      ;
      
    }),catchError(error => of(error)));
    
  }
  addtag(id: number,tag:string){
   
   

    this.images.forEach((img) =>{
      if (img.id === id){
        img.addtag(tag)
        this.serverService.updateImage(id,serialize(img));
      }
    })

    
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