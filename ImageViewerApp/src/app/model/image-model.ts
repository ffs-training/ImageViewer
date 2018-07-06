export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    updateTag(tag:string){
        if(!this.tags.includes(tag) && tag != '') {
            this.tags.push(tag);
        }
    }
}
