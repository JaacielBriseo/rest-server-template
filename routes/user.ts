import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';
import { emailExists, isValidRole, userExistsById } from '../helpers';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user';

const router = Router();

router.get('/', getUsers);

router.get('/:id', [check('id').isMongoId(), check('id').custom(userExistsById), validateFields], getUser);

router.post(
	'/',
	[
		check('fullName', 'Full name is required').not().isEmpty(),
		check('fullName', 'Full name must be at least 5 characters').isLength({ min: 5 }),
		check('fullName', 'Full name must be max 25 characters').isLength({ max: 25 }),
		check('email', 'Email is required').not().isEmpty(),
		check('email', 'Not a valid email').isEmail(),
		check('email').custom(emailExists),
		check('password', 'Password is required').not().isEmpty(),
		check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
		check('password', 'Password must contain a lowercase , an uppercase and a number ').matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/
		),
		validateFields,
	],
	createUser
);

router.patch(
	'/:id',
	[
		check('id').isMongoId(),
		check('id').custom(userExistsById),
		//  check('role').custom(isValidRole), //TODO: Find a way to check this just if the user wants to change it
		validateFields,
	],
	updateUser
);

router.delete('/:id', [check('id').isMongoId(), check('id').custom(userExistsById), validateFields], deleteUser);

export default router;
