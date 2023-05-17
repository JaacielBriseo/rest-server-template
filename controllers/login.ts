import { Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';
import { jwtGenerator } from '../helpers/jwtGenerator';

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body as { email: string; password: string };

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message: `User with email '${email}' not found`,
			});
		}
		if (!user.isActive) {
			return res.status(400).json({ message: 'User seems to be inactive, contact the admin' });
		}
		if (!bcrypt.compareSync(password, user.password!)) {
			return res.status(400).json({
				message: 'Email and/or password are incorrect',
			});
		}

		const token = await jwtGenerator(user._id.toString());
		return res.status(200).json({ user, token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Error login user, please contact admin',
		});
	}
};
