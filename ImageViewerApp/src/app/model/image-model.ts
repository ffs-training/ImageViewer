export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    addTag(tag: string){
        if(tag !== '' && this.tags.indexOf(tag) < 0)
        this.tags.push(tag);
    }
}
