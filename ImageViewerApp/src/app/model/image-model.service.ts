import { Injectable } from '@angular/core';
import { ImageModel } from './image-model';
import { ServerService } from '../common/server.service';
import { deserialize } from 'serializer.ts/Serializer';
import { serialize } from 'serializer.ts/Serializer';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ObserverService } from '../common/observer.service';

@Injectable({
  providedIn: 'root'
})
export class ImageModelService {
  public images: ImageModel[];
  constructor(private serverService: ServerService,private observerService:ObserverService) { }

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

  public addTag(id: number, tag: string):Observable<any> {
    let image = this.images.find((image) => image.id===id);
    image.addTag(tag);
    return this.serverService.updateImage(id,this.serialize(image));
  }

  public fetch(): Observable<ImageModel[]> {
    this.images = [];
    return this.serverService.getImages().pipe(
      map((images) => {
        images.forEach((image) => {
          this.images.push(this.deserialize(image));
        })
        return this.images;
      }),
    );
  }
}
