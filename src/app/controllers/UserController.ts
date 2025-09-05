import { Router, Request, Response } from "express";
import UserRepository from "../repositores/UserRepository";
import AutenticateMiddleware from "../middlewares/AuthMiddleware"

class UserController {
    // Propriedade pública que vai armazenar o router do Express
    public router: Router;

    constructor() {
        // Cria uma nova instância de Router
        this.router = Router();
        // Inicializa as rotas desse router
        this.inicializeRoutes();
    }

    private inicializeRoutes() {
        this.router.get('/', this.getAllUsers); // registrando rotas
        this.router.post('/', this.createUser);
        this.router.get('/:id',AutenticateMiddleware, this.getUser); // no caso usando o middleware de autenticação
        this.router.put('/:id', this.updateUser);
        this.router.delete('/:id', this.deleteUser);
        this.router.post('/auth', this.authenticationUser) // criando para gerar autenticação
        
    }
    private async getAllUsers(req: Request, res: Response) {

        const users = await UserRepository.getUsers();
        res.status(200).json(users);
    }

    private async createUser(req:Request, res: Response){
        const userCreated = await UserRepository.newUser(req.body);
        res.status(201).json(userCreated);
    }

    private async getUser(req:Request, res:Response){
        const id  = parseInt(req.params.id); //vem como string mais converto para number
        const user = await UserRepository.getUser(id);
        return res.status(200).json(user);
    }


    private async updateUser(req:Request, res:Response){
        const id = parseInt(req.params.id);
        const userUpdate = await UserRepository.EditeUser(id, req.body);
        res.status(200).json(userUpdate);
    }

    private async deleteUser(req:Request, res:Response){
        const id = parseInt(req.params.id);
        const userDelete = await UserRepository.deleteUser(id);
        res.status(200).json(userDelete);
    }

    private async authenticationUser(req:Request, res:Response){
        const token = await UserRepository.authentication(req.body)
        res.status(200).json(token)
    }
}

const userRouter = new UserController().router;

export default userRouter;
