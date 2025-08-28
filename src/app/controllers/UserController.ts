import { Router , Request, Response} from "express";
import UserRepository from "../repositores/UserRepository";

class UserController {
    // Propriedade pública que vai armazenar o router do Express
    public router: Router;

    constructor(){
        // Cria uma nova instância de Router
        this.router = Router();

        // Inicializa as rotas desse router
        this.inicializeRoutes();
    }

    private inicializeRoutes(){
        // Define a rota '/' dentro do router
        // Esta rota é relativa ao router, ou seja, será combinada com o prefixo definido no routes/index.ts
        // Ex.: routes.use('/users', userRouter) → rota final: /users/
        // Quando essa rota for acessada, executa a função getAllUsers
        this.router.get('/', this.getAllUsers);
    }

    private async getAllUsers(req: Request, res: Response){
        // Chama o método do repository que acessa o banco e retorna todos os usuários
        const users = await UserRepository.getUsers();

        // Retorna os dados em formato JSON para o cliente 
        res.status(200).json(users);
    }
}

// Cria uma instância do UserController e exporta apenas o router configurado
// Esse objeto router é que será usado no arquivo de rotas (routes/index.ts)
const userRouter = new UserController().router;

export default userRouter;
