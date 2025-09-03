import * as yup from 'yup';

let UserSchema = yup.object().shape({
    id: yup.number(),
    name: yup
    .string()
    .required("O campo nome é obrigatório")
    .min(3,"O campo nome deve ter pelo menos 3 caracteres" )
    .max(100, "O campo nome não pode ter mais de 100 caracteres")
    ,

    email: yup
    .string()
    .email("O campo email deve ser um email válido")
    .required("O campo email é obrigatório")
    .min(10, "O campo email deve ter pelo menos 10 caracteres")
    .max(100, "O campo email não pode ter mais de 100 caracteres"),
    

    password: yup
    .string()
    .required()
    .max(100, "O campo senha não pode ter mais de 100 caracteres"),


    birth_date: yup
    .string()
    .typeError("O campo data de nascimento deve ser uma data") // equivale ao "date.base" do Joi
    .required("O campo data de nascimento é obrigatório"),

    active: yup
    .boolean()
    .typeError("O campo ativo deve ser um valor booleano") // equivale ao "boolean.base" do Joi
    .required("O campo ativo é obrigatório"),
})

export default UserSchema