export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    // nullCheck(){
    //     if(this.tags.length == 0){
    //         return true;
    //     }
    // }
    // tagCheck(inTag:string){
    //     this.tags.forEach((tag=>{if(tag == inTag) return}))
    // }
    
    addTag(tag:string){
        this.tags.forEach((inTag) => {if(inTag != tag && tag == ''){}else{tag = '';}})
    }
}

