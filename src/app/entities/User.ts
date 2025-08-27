import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('users') //Diz: “Essa classe representa uma tabela no banco de dados”.
class User {
    @PrimaryGeneratedColumn('increment') //Diz: “Esse campo é a chave primária e o valor será gerado automaticamente (ex: id 1, 2, 3…)”.
    id: number;

    @Column("varchar", { nullable: false, length: 100 }) //defino aqui que é uma coluna defino o tipo que vai ser a coluna e dentro de um objeto defino as propiedades
    name: string;

    @Column("varchar", { nullable: false, length: 100, unique: true })
    email: string;


    @Column("varchar", { nullable: false, length: 100 })
    password: string;

    @Column("date", { nullable: false })
    birth_date: Date

    @Column("boolean", { nullable: false, default: true })
    active: boolean

    @CreateDateColumn() //Diz que quando criar coluna e quardo o historico aqui dentro
    created_at: Date

    @UpdateDateColumn() // quando mudar qualquer coisa na coluna salve a data 
    updated_at: Date
}

export default User