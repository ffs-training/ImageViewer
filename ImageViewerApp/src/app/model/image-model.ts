export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    setTags(inTag: string){
        //空文字かつtagsに同じ要素が存在しない場合
        if(inTag != '' && this.tags.indexOf(inTag) === -1){
            //tagsに追加
            this.tags.push(inTag);
        }
    }
}
