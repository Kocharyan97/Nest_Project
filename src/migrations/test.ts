import { User } from "src/user/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm"
import * as bcrypt from 'bcrypt';


export class User20231012171851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pass = await bcrypt.hash('aaaaaa', 6)   

        await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([{
            id: 22,
            email: 'testemail@test.com',
            password: pass,
        }])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
