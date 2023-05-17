import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({
			message: 'There is no token on request',
		});
	}

	try {
		const secret = process.env.JWT_SECRET;
		if (!secret) {
			throw new Error('Secret jwt seed must be in .env file');
		}
		const payload = jwt.verify(token.split(' ')[1], secret) as { uid: string };
		const user = await User.findById(payload.uid).lean();

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			});
		}

		if (!user?.isActive) {
			return res.status(401).json({
				message: 'Not valid token',
			});
		}

		req.user = user as any;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			message: 'Unvalid token',
		});
	}
};
