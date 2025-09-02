import User from "../entities/User";
import { IUserOutput, IUserIput } from "../interfaces/IUser";
import { AppDataSource } from "../../database/dataSource";
import ErrorExtension from "../utils/ErrorExtensions";


class UserRepository {
    private static usersRepository = AppDataSource.getRepository(User) //atributo da classe que recebe a entidade que no caso User contem o espelhamento do banco de dados ja criado

    static async getUsers() { //método da classe para visualizar 
        return this.usersRepository.find() // find = SELECT * FROM user .... Basicamente estou chamando a tabela user nesse repositorios
    }

    //Metodo que insere dados no banco de dados
    static async newUser(user:IUserIput):Promise<IUserOutput>{
       const createdUser = await this.usersRepository.save(user);
       return createdUser;
    }

    //Metodo get com parametro
    static  async getUser(id:number):Promise<IUserOutput | null>{
        const user = await this.usersRepository.findOneBy({id}); //Método findOne BY encontra o primeiro id correspondente 
        if(!user){
            throw new ErrorExtension(404, "User not found!")
        }

        return user;
    }

    //Método PUT para atualização de dados
    static async EditeUser(id:number, update:IUserIput):Promise<{message:string}>{
        //verificando se tenho o id disponivel antes de fazer o update
        const userExists = await this.usersRepository.findOneBy({id})
        if(!userExists){
            throw new ErrorExtension(404, "User not found!")
        }

        const updateUser = await this.usersRepository.update(id, update)
        console.log(updateUser)
        return {message:`The user with ID ${id} has been updated successfully.`}
    }


    //Método para deletar Usuário

    static async deleteUser(id:number):Promise<{message:string}>{
        const result = await this.usersRepository.delete({id})
        if(result.affected === 0){
            throw new ErrorExtension(404, `User ${id} Not Found`)
        }
         await this.usersRepository.delete({id})
        return {message:`User ${id} Deleted!`}
    }
}

export default UserRepository