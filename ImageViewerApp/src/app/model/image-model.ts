export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    constructer( id: number, path: string, tags: string[])
    {
        this.id = id;
        this.path = path;
        this.tags = tags;
    }

    addTag(tag: string[]){
        this.tags = tag;
    }


}
