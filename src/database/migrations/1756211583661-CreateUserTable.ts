import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1756211583661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,  //O id aqui gerado sera unico 
                        isGenerated: true,  //O valor da coluna será gerado automaticamente pelo banco de dados
                        generationStrategy: "increment" //Incrementa de 1 em 1
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: "100", //Maximo de Caracateres permitidos
                        isNullable: false //Campo obrigatório
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: "100",
                        isNullable: false,
                        isUnique: true //Permite epenas 1 email unico, não permite 2 iguais
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: 'birth_date',
                        type: 'Date',
                        isNullable: false,
                    },
                    {
                        name: 'active',
                        type: 'boolean',
                        default: true, //Valor padrão  inicial
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: "now()", //Valor padrão  inicial data e hora atual
                    },

                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: "now()", //Valor padrão  inicial data e hora atual
                    },


                ]


            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
