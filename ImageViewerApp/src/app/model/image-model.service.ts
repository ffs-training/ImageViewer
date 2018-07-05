import { Injectable } from '@angular/core';
import { ImageModel } from './image-model';
import { ServerService } from '../common/server.service';
import { deserialize } from 'serializer.ts/Serializer';
import { serialize } from 'serializer.ts/Serializer';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageModelService {
  images:ImageModel[];
  constructor(private serverService:ServerService) { }
  
  fetch():Observable<ImageModel[]>{
     this.images = [];
     return this.serverService.getImages().pipe(
       map((anyObjects)=>{
         this.images = [];
         anyObjects.forEach((anyObject)=>{
           this.images.push(this.deserialize(anyObject));
         })
         return this.images;
       })
      )
    //   map((images)=>{
    //   this.images = images.map((image)=>{this.images.push(this.deserialize(image))
    //   });
    // })
    // );

    
  }

  addTag(id:number,tag:string){
   const image = this.images.find((img) =>{return img.id === id});
   image.addTag(tag); 
   
  //  this.images.forEach((img)=>{if(img.id === id){
  //    img.addTag(tag);
  //  }})

  this.serverService.updateImage(id,this.serialize(image));
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
