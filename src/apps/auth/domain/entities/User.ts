interface Email {
    id: string;
    otp?: string;
    isVerified: boolean;
}

export interface UserAttributes {
    username: string;
    email: Email;
    password: string;
}

export class User {
    username: string;
    email: Email;
    password: string;

    constructor({ username, email, password }: UserAttributes) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
