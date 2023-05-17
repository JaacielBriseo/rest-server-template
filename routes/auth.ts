import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';
import { login } from '../controllers/login';

const router = Router();

router.post(
	'/login',
	[
		check('email', 'Email is required').not().isEmpty(),
		check('email', 'Must be a valid email').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		validateFields,
	],
	login
);

export default router;
