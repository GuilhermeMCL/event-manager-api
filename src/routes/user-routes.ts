import { FastifyInstance } from "fastify";
import { UserControllers } from '../controllers/UsersControllers';



const usersControllers = new UserControllers();

export async function userRoutes(app: FastifyInstance) {
    app.post("/register", usersControllers.registerUser);
    app.post("/login", usersControllers.loginUser);
}