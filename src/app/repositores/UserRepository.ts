import User from "../entities/User";
import { IUserOutput } from "../interfaces/IUser";
import { AppDataSource } from "../../database/dataSource";

class UserRepository {
    private static usersRepository = AppDataSource.getRepository(User) //atributo da classe que recebe a entidade que no caso User contem o espelhamento do banco de dados ja criado

    static async getUsers() { //método da classe para visualizar 
        return this.usersRepository.find() // find = SELECT * FROM user .... Basicamente estou chamando a tabela user nesse repositorios
    }
}

export default UserRepository