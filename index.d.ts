declare namespace Express {
	export interface Request {
		user?: {
			_id: string;
			fullName: string;
			email: string;
			isActive: boolean;
			role: string;
			createdAt: string;
			updatedAt: string;
		};
	}
}
