interface IUserIput {
    name:string;
    email:string;
    password:string;
    birth_date:Date;
    active?:boolean;
}

interface IUserOutput extends IUserIput{
    id:number;
    
}

export {IUserIput, IUserOutput}  //definindo 2 interface para o usuário a input sao os dados que entram e output tem os dados da interface input porem com id que é criado quando envio para o banco de dados