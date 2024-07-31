import express from 'express';
import { validationResult } from 'express-validator';
import userService from '../services/user-service';
import ApiError from '../exceptions/api-error';
import { config } from 'dotenv';
config({ path: '.env' });

const CLIENT_URL = process.env.CLIENT_URL || "";

class UserController {
    async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }
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
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true/*, secure: true*/})
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.json(token);
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
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true/*, secure: true*/});
            return res.json(userData)
        } catch (error) {
            
        }
    }

    async getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();