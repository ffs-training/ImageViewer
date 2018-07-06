export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    public addTag(tag:string){
        if(this.isAddable(tag)){
            this.tags.push(tag);
        }
    }

    private isAddable(tag:string):boolean{
        return (tag !== "" && this.tags.indexOf(tag) === -1);
    }
}
