export class ImageModel {
    id: number;
    path: string;
    tags: string[];
    addTag(tag: string) {
        let check: boolean = false;
        if (tag !== '') {
            check = true;
            this.tags.forEach(element => {
                if (element === tag) {
                    check = false;
                }
            });
        }
        if (check) {
            this.tags.push(tag);
        };
    }
}
