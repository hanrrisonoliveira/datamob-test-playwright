import { APIRequestContext, expect } from '@playwright/test';
import { User } from '../types/user';

export class UserApi {

    constructor(private request: APIRequestContext) {}

    async criarUsuario(user: User): Promise<void> {

        const response = await this.request.post('/api/createAccount', {
            form: user
        });

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toBe('User created!');

    }

    async verificarLogin(email: string, password: string): Promise<void> {

        const response = await this.request.post('/api/verifyLogin', {
            form: {
                email,
                password
            }
        });

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User exists!');

    }

    async deletarUsuario(email: string, password: string): Promise<void> {

        const response = await this.request.delete('/api/deleteAccount', {
            form: {
                email,
                password
            }
        });

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('Account deleted!');

    }
}