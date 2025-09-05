import * as yup from 'yup';
import bcrypt from "bcrypt"
import User from "../entities/User";
import { IUserOutput, IUserIput } from "../interfaces/IUser";
import { AppDataSource } from "../../database/dataSource";
import ErrorExtension from "../utils/ErrorExtensions";
import { UserSchema, updateUserSchema } from "../utils/validations/userSchemaValidation";
import { ILogin } from '../interfaces/ILogin';
import Auth from '../utils/Auth';

class UserRepository {
    private static usersRepository = AppDataSource.getRepository(User) //atributo da classe que recebe a entidade que no caso User contem o espelhamento do banco de dados ja criado

    static async getUsers() { //método da classe para visualizar 
        return this.usersRepository.find() // find = SELECT * FROM user .... Basicamente estou chamando a tabela user nesse repositorios
    }

    //Metodo que insere dados no banco de dados
    static async newUser(user: IUserIput): Promise<IUserOutput> {
        try {
            // Valida o usuário
            await UserSchema.validate(user, { abortEarly: false }); // abortEarly: false para pegar todos os erros

            //Criptografando senha depois de validar esquema
            const hashedPassword = await bcrypt.hash(user.password, 10)
            user.password = hashedPassword;

            // Se passar, salva no banco
            const createdUser = await this.usersRepository.save(user);
            return createdUser;

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                // err.errors é um array com todas as mensagens de erro
                throw new ErrorExtension(400, err.errors.join(", "));
            }
            throw err;
        }

    }

    //Metodo get com parametro
    static async getUser(id: number): Promise<IUserOutput | null> {
        const user = await this.usersRepository.findOneBy({ id }); //Método findOne BY encontra o primeiro id correspondente 
        if (!user) {
            throw new ErrorExtension(404, "User not found!")
        }

        return user;
    }

    //Método PUT para atualização de dados
    static async EditeUser(id: number, update: IUserIput): Promise<{ message: string }> {
        //verificando se tenho o id disponivel antes de fazer o update
        const userExists = await this.usersRepository.findOneBy({ id })
        if (!userExists) {
            throw new ErrorExtension(404, "User not found!")
        }
         //Criptografando senha se na hora de eu fazer um upload eu tiver uma senha
        if (update.password) {
            const hashedPassword = await bcrypt.hash(update.password, 10)
            update.password = hashedPassword;
        }

        try {
            await updateUserSchema.validate(update, { abortEarly: false })
            const updateUser = await this.usersRepository.update(id, update)
            console.log(updateUser)
            return { message: `The user with ID ${id} has been updated successfully.` }
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                // err.errors é um array com todas as mensagens de erro
                throw new ErrorExtension(400, err.errors.join(", "));
            }
            throw err;
        }
    }

    //Método para deletar Usuário
    static async deleteUser(id: number): Promise<{ message: string }> {
        const result = await this.usersRepository.delete({ id })
        if (result.affected === 0) {
            throw new ErrorExtension(404, `User ${id} Not Found`)
        }
        await this.usersRepository.delete({ id })
        return { message: `User ${id} Deleted!` }
    }

    //Pegar email , encontra o primeiro que tiver esse email
    static async getUserEmail(email:string): Promise<IUserOutput | null>{
        return this.usersRepository.findOneBy({email})
    }

    static async authentication(loginData:ILogin):Promise<string>{
        const {email,  password } = loginData

        if(!email || !password) throw new ErrorExtension(401, "Missing data")
        
            const user = await this.getUserEmail(email)
            if(!user?.password){
                throw new ErrorExtension(401, "E-mail or password wrong")
            } else{
                const passwordVerification = await bcrypt.compare(password, user.password);
                console.log(passwordVerification)
                if(!passwordVerification){
                    throw new ErrorExtension(401, "E-mail or password wrong")
                }
            }

            const payload = {
                name: user.name, 
                email:user.email
            }

            const auth = new Auth()
            const token = auth.JwtGenerator(payload)

            return token
        
    }
}

export default UserRepository