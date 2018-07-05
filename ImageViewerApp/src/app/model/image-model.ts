export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    addTag( tag :string )
    {
      if (tag == ""){
         console.log('tagを入力してください');
         return ;
      }

        this.tags.forEach(element => {
            if (element === tag){
                console.log('tagが重複しています');
                return ;
            }
        });

        //tagsにtagを追加
        this.tags.push(tag);
    }
}
