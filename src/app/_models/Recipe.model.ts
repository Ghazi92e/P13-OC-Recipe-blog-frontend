export class Recipe {
    id: number
    title: string
    description: string
    category: number
    file: number
    user: number
    image_url: string

    constructor() {
        this.id = 0
        this.title = ''
        this.description = ''
        this.category = 0
        this.file = 0
        this.user = 0
        this.image_url = ''
    }
}