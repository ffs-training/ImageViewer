export class ImageModel {
    id: number;
    path: string;
    tags: string[];

    addTag(tag: string) {
        if (tag === "") {
            console.log("タグが空白");
        }
        else if (this.tags.indexOf(tag) !== -1) {
            console.log("タグが重複");
        }
        else{
            this.tags.push(tag);
        }
    }
}
