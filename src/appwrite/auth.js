/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (user) {
                return this.userLogin({ email, password });
            } else {
                return user;
            }
        } catch (error) {
            throw error;
        }
    }

    async userLogin({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async userLogout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    async currentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
