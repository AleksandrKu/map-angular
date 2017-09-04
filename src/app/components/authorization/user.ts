export class User{
    email: string;
    password: string;
    userId: number;
    constructor(email, password, userId) {
        this.email= email;
        this.password = password;
        this.userId = userId;
    }
}