import "reflect-metadata"
import { DataSource } from "typeorm"
import {CreateUserTable1756211583661} from "./migrations/1756211583661-CreateUserTable"
import {CreateSeedUsersTable1756317660505} from "./migrations/1756317660505-createSeedUsersTable"
import User from "../app/entities/User"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "@Gs189970",
    database: "curso_typeorm",
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [
        CreateUserTable1756211583661, 
        CreateSeedUsersTable1756317660505
    ],
})