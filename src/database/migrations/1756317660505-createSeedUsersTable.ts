import { MigrationInterface} from "typeorm";
import User from "../../app/entities/User";
import { AppDataSource } from "../dataSource";
import userSeed from "../seeders/UserSeed";

export class CreateSeedUsersTable1756317660505 implements MigrationInterface {

    public async up(): Promise<void> {
        const userRepository = AppDataSource.getRepository(User)
        await userRepository.save(userSeed)
    }

    public async down(): Promise<void> {
        
    }

}
