export class ImageModel {
    id: number;
    path: string;
    tags: string[];
    setTag(tag: string){
        let check:boolean = true;
        this.tags.forEach(element => {
            if(element === tag){
                check =false;
            }
            if(check){
                this.tags.push(tag);
            }
        });
    }
}
