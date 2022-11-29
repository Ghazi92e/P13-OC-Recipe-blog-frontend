export class Users {
    id: number
    username: string
    email: string
    password: string
    file: number
    image_url: string
    is_superuser: boolean

    constructor() {
        this.id = 0
        this.username = ''
        this.email = ''
        this.password = ''
        this.file = 1
        this.image_url = ''
        this.is_superuser = false
    }
}

export class CreateUserMessage {
    id: number
    sender: number
    receiver: number
    message: string

    constructor() {
        this.id = 0
        this.sender = 0
        this.receiver = 0
        this.message = ''
    }
}