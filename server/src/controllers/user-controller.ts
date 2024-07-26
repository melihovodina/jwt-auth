import express from 'express';
import userService from '../services/user-service';
import { config } from 'dotenv';
config({ path: '.env' });

const CLIENT_URL = process.env.CLIENT_URL || "";

class UserController {
    async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true/*, secure: true*/})
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async activate(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(CLIENT_URL)
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            res.json(['123', '456']);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();