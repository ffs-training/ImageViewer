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

  images :ImageModel[];

  constructor(private serverService: ServerService, private observerService: ObserverService) { }

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

  public fetch(): Observable<ImageModel[]>
  {
    //ImageModel型の配列を初期化
    this.images = [];
    //配列を取得
    return this.serverService.getImages().pipe(
      map( (images) => {
        images.forEach((image) =>{
          this.images.push(this.deserialize(image))
        });
        return this.images;
      })
    );
  }

  public update(index: number, input: string): Observable<void>{
    //新しいtagを設定
    this.images[index].setTags(input);
    //アップデート（サーバー）
    return this.serverService.updateImage(this.images[index].id,this.serialize(this.images[index]));
    }
}
