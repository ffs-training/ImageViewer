export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    addtag(tag: string){
this.tags.push(tag)
    }
}
