import "reflect-metadata"
import "dotenv/config";
import { DataSource } from "typeorm"
import {CreateUserTable1756211583661} from "./migrations/1756211583661-CreateUserTable"
import {CreateSeedUsersTable1756317660505} from "./migrations/1756317660505-createSeedUsersTable"
import User from "../app/entities/User"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [
        CreateUserTable1756211583661, 
        CreateSeedUsersTable1756317660505
    ],
})