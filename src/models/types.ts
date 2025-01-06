export interface UserInput {
    email: string;
    password: string;
    name: string;
}

export interface BookInput {
    isbn: string;
    title: string;
    copiesAvailable: number;
    totalCopies: number;
    authors: string[];
    categories: string[];
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface JWTPayload {
    userId: string;
    role: string;
}