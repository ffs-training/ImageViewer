import { delay } from "rxjs/operators";

export class ImageModel {
    id: number;
    path: string;
    tags: string[];
    addTag(tag:string){
        let flag:Boolean = true;
        if(tag === ''){
            flag = false
        }else{
            this.tags.forEach((tags)=>{
                if(tags === tag){
                    flag = false;
                }
            });
        }
        if(flag){
            this.tags.push(tag);
        }
    }
}

