import { Role, User } from '../models';

export const emailExists = async (email = '') => {
	const emailRegistered = await User.findOne({ email });
	if (emailRegistered) throw new Error(`Email '${email}' is already registered`);
};

export const isValidRole = async (role = '') => {
	const roleExists = await Role.findOne({ role });
	if (!roleExists) throw new Error(`Role '${role}' is not a registered role in DB`);
};

export const userExistsById = async (id = '') => {
	const userExists = await User.findById(id);
	if (!userExists) throw new Error(`User with id '${id}' not found`);
};
