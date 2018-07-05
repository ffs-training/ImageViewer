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

  images: ImageModel[];

  constructor(private serverService: ServerService) {

  }

  // サーバーAPIからデータをとってくる
  // サーバーをよびたい
  // observableを返す
  fetch(): Observable<ImageModel[]> {
    return this.serverService.getImages().pipe(
      // 成功時の処理
      map((getImages) => {
        this.images = [];
        getImages.forEach((element) => {
          this.images.push(this.deserialize(element));
        });
        // ここで返す型によってObservableの型が決定する
        return this.images;
      }),
      // 失敗時の処理
      //catchError(error => of(error)); // 失敗した時のエラー
    );
  }

  // タグ追加処理
  addTag(id: number, tag: string) {
    // idの一致するimageを見つけてタグを追加する
    let image = this.images.find((image) =>{
      return image.id === id;
    });
    image.addTag(tag);
    // foreach文での書き換え
    // this.images.forEach((img) => {
    // if(img.id === id) {
    // img.addTag(tag);  
    //}
    //});
    
    // タグを更新する
    this.serverService.updateImage(image.id,this.serialize(image));
  }

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


}
