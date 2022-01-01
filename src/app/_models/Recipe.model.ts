export class Recipe {
    id: number
    title: string
    description: string
    category: number
    file: string
    user: number

    constructor() {
        this.id = 0
        this.title = ''
        this.description = ''
        this.category = 0
        this.file = ''
        this.user = 0
    }
}