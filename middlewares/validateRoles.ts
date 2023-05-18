import { NextFunction, Request, Response } from 'express';

export const isAdminRole = (req: Request, res: Response, next: NextFunction) => {
	if (!req.user) {
		return res.status(500).json({
			msg: 'Must validate token first',
		});
	}

	const { role, fullName } = req.user;

	if (role !== 'ADMIN_ROLE') {
		return res.status(401).json({
			msg: `${fullName} is not admin - Doesn't have permission to do this`,
		});
	}
	next();
};

export const hasRole = (...roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(500).json({
				msg: 'Must validate token first',
			});
		}

		if (!roles.includes(req.user.role)) {
			return res.status(401).json({
				msg: `This service requires one of this roles : ${roles}`,
			});
		}

		next();
	};
};

export const isAdminOrOwner = (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const authUser = req.user;
	if (!authUser) {
		return res.status(500).json({
			msg: 'Must validate token first',
		});
	}
	if (authUser._id.toString() !== id && authUser.role !== 'ADMIN_ROLE') {
		return res.status(401).json({
			msg: `${authUser.fullName} is not authorized to do this`,
		});
	}

	next();
};
