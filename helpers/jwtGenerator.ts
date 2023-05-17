import jwt from 'jsonwebtoken';
export const jwtGenerator = (uid: string) => {
	return new Promise<string>((resolve, reject) => {
		const payload = { uid };

		const secret = process.env.JWT_SECRET;
		if (!secret) {
			throw new Error('JWT Secret seed needs to be declared on .env file');
		}
		jwt.sign(payload, secret, { expiresIn: '4h' }, (err, token) => {
			if (err) {
				console.log(err);
				reject('Error generating token');
			} else {
				resolve(token!);
			}
		});
	});
};
