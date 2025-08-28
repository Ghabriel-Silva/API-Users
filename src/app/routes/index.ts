import { Router } from "express";
import userRouter from "../controllers/UserController";

const routers = Router();

// Quando a rota começar com /users, delega para userRouter
routers.use('/users', userRouter);

export default routers