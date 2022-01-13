export class FileUpload {
    id: number;
    file: File | any;

    constructor(file: File) {
        this.id = 0;
        this.file = file;
    }
}