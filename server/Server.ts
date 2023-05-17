import express, { Application } from 'express';
import cors from 'cors';
import { dbConnect } from '../db/config';
import { authRoutes, userRoutes } from '../routes';

export default class Server {
	private app: Application;
	private port: string;
	private apiPaths = {
		users: '/api/users',
		auth: '/api/auth',
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '8000';
		this.connectDB();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
	}

	async connectDB() {
		dbConnect();
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port: ${this.port}`);
		});
	}

	routes() {
		this.app.use(this.apiPaths.users, userRoutes);
		this.app.use(this.apiPaths.auth, authRoutes);
	}
}
