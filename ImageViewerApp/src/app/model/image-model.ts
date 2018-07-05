export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    tagAdd(newtag : string){
        if(newtag===''||this.tags.some((tag)=>{return tag === newtag;}))
        {
        }else{
            this.tags.push(newtag); 
        }
    }
}

