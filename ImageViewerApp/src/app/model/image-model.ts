export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    addtag(tag: string){
        let judge : boolean = false;
        let a : number = 0;
        let i : number = 0;
        for(i =0 ; i <= this.tags.length ; i++){
            if(tag == this.tags[i]){
                a++;
            }
        }

        if(tag === "" || a !== 0){
            judge = true;
        }

        if(judge === false){   
            this.tags.push(tag)
        }
    }
}
