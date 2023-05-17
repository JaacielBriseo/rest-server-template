import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
	res.json({
		msg: 'This route returns all users',
	});
};

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	res.json({
		msg: `This route returns user with id ${id}`,
	});
};

export const createUser = async (req: Request, res: Response) => {
	res.json({
		msg: `This route creates a user`,
	});
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	res.json({
		msg: `This route updates a user with id ${id}`,
	});
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	res.json({
		msg: `This route deletes a user with id ${id}`,
	});
};
