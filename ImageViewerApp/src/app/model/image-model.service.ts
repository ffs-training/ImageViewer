import { Injectable } from '@angular/core';
import { ImageModel } from './image-model';
import { ServerService } from '../common/server.service';
import { deserialize } from 'serializer.ts/Serializer';
import { serialize } from 'serializer.ts/Serializer';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageModelService {
  
  imageModelArray: Array<ImageModel>;
  constructor( private serverService: ServerService) { 
    this.imageModelArray = new Array<ImageModel>();
  }
  

  fetch(): Observable<Array<ImageModel>> {
    return this.serverService.getImages().pipe( 
      map( (images) => { 
        this.imageModelArray = [];
        images.forEach( (image) => 
          this.imageModelArray.push(this.deserialize(image)));
          return  this.imageModelArray;
        }), 
      catchError(error => of(error)) 
    );
  
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
      Id: imageModel.id,
      Path: imageModel.path,
      Tags: imageModel.tags
    });
  }

}
