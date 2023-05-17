import { Schema, model } from 'mongoose';
const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: [true, 'Full name is required'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		role: {
			type: String,
			enum: ['USER_ROLE', 'SUPERUSER_ROLE', 'ADMIN_ROLE'],
			default: 'USER_ROLE',
		},
		img: {
			type: String,
		},
	},
	{ timestamps: true }
);

UserSchema.methods.toJSON = function () {
	const { __v, password, ...user } = this.toObject();
	return user;
};

export default model('User', UserSchema);
