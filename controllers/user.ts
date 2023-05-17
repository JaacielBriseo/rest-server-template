import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
	const { limit = 5, from = 0 } = req.query;
	try {
		const [users, total] = await Promise.all([
			User.find({ isActive: true }).skip(Number(from)).limit(Number(limit)).select('-password -__v').lean(),
			User.countDocuments({ isActive: true }),
		]);
		return res.status(200).json({ users, total });
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			message: 'Error while getting users, please contact the admin',
		});
	}
};

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id).select('-password -__v').lean();
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: `Error while getting user with id ${id}, please contact the admin`,
		});
	}
};

export const createUser = async (req: Request, res: Response) => {
	const { fullName, email, password } = req.body as { fullName: string; email: string; password: string };
	try {
		const user = await User.create({
			email,
			fullName: fullName.toUpperCase(),
			password: bcrypt.hashSync(password, 12),
		});

		return res.status(201).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Error while creating user, please contact the admin',
		});
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { role, password, email, ...rest } = req.body;
	try {
		if (password) {
			rest.password = bcrypt.hashSync(password, 12);
		}
		rest.fullName = rest.fullName.toUpperCase();
		const user = await User.findByIdAndUpdate(id, rest, { new: true, runValidators: true })
			.select('-password -__v')
			.lean();
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Error while updating user, please contact the admin',
		});
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		//* Changing the isActive property of the user to false so we can keep the reference of the user in db
		const user = await User.findByIdAndUpdate(id, { isActive: false });
		return res.status(200).json({
			message: `User '${user!.fullName}' deleted`,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Error while deleting user, please contact the admin',
		});
	}
};
