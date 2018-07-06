export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    setTag(inTag: string){

        let flag: boolean = false;
        if(inTag != '' && this.tags.indexOf(inTag) == -1){
            this.tags.push(inTag);
        }
    }
}
