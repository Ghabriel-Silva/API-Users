import { ITokenData } from "../interfaces/ILogin";
import Jwt, { SignOptions } from "jsonwebtoken";
import ErrorExtension from "./ErrorExtensions";
import dotenv from "dotenv"

dotenv.config()

const SECRET = process.env.JWT_SECRET as string //Forçando dizendo que é uma string vai estar ali

const jwtDefaultConfig: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1hr",
}

class Auth {
    constructor(private jwtConfig?: SignOptions) {
        if (!jwtConfig) {
            this.jwtConfig = jwtDefaultConfig
        }
    }

    // Função que gera um token JWT
    // Recebe o payload com os dados que vão dentro do token, os dados esperado são nome e email
    public JwtGenerator(payload: ITokenData) {
        // Jwt.sign() cria o token JWT
        // 1º argumento: payload → os dados que você quer armazenar (ex: id do usuário)
        // 2º argumento: SECRET → chave secreta do servidor, usada para criar a assinatura
        // 3º argumento: this.jwtConfig → opções como algoritmo e tempo de expiração
        return Jwt.sign(payload, SECRET, this.jwtConfig);
        // O resultado é uma string no formato: header.payload.signature
        // header → informações sobre algoritmo e tipo (gerado automaticamente, ou customizado)
        // payload → dados do usuário
        // signature → garante que o token não foi alterado (assinatura usando o SECRET)
    }


    //Método de verficação do tolken
    public AuthenticateToken(token: string) {
        if (!token) {
            throw new ErrorExtension(401, "Token Not Found")
        }

        try {
            const validateJwt = Jwt.verify(token, SECRET)
            return validateJwt
        } catch (erro) {
            throw new ErrorExtension(401, "Token Not Found")
        }
    }
}

export default Auth

