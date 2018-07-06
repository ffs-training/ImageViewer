import { Injectable } from '@angular/core';
import { ImageModel } from './image-model';
import { ServerService } from '../common/server.service';
import { deserialize } from 'serializer.ts/Serializer';
import { serialize } from 'serializer.ts/Serializer';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ObserverService} from '../common/observer.service';

@Injectable({
  providedIn: 'root'
})
export class ImageModelService {
  private images : ImageModel[];
  constructor(private serverService : ServerService,
    private observerService:ObserverService) { }

  fetch(): Observable<ImageModel[]>{
    // return this.serverService.getImages().forEach(
    //   (serverImage) => {this.images.push(this.deserialize(serverImage))}
    // )
    this.images=[];
    return this.serverService.getImages().pipe(
      map((images) => {
        images.forEach((image) => {
          this.images.push(this.deserialize(image))
        });
        return this.images;
      })
    )
  }
  
  addTag(id:number,newtag:string): Observable<any>{

    let img = this.images.find((image) => {
      return image.id === id;
    })
    img.tagAdd(newtag);
    return this.serverService.updateImage(id,serialize(img));
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
