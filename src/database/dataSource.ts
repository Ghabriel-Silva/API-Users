import "reflect-metadata"
import { DataSource } from "typeorm"
import {CreateUserTable1756211583661} from "./migrations/1756211583661-CreateUserTable"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "@Gs189970",
    database: "curso_typeorm",
    synchronize: true,
    logging: false,
    entities: [],
    subscribers: [],
    migrations: [CreateUserTable1756211583661],
})