import express from 'express';
import ApiError from '../exceptions/api-error';
import tokenService from '../services/token-service';

interface CustomRequest extends express.Request {
    user?: any;
}

export function authMiddleware(req: CustomRequest, res: express.Response, next: express.NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return next(ApiError.unathorizedError());
        }
        const accessToken = authHeader.split(' ')[1];
        if(!accessToken) {
            return next(ApiError.unathorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(ApiError.unathorizedError());
        }
        req.user = userData;
        next();
    } catch (error) {
        return next(ApiError.unathorizedError());
    }
}
